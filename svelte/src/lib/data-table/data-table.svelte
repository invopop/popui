<script lang="ts" generics="TData">
  import {
    type ColumnSizingState,
    type ColumnSizingInfoState,
    type ColumnOrderState,
    type PaginationState,
    type Row,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
    type Column
  } from '@tanstack/table-core'
  import { onMount, onDestroy } from 'svelte'
  import DataTableToolbar from './data-table-toolbar.svelte'
  import DataTablePagination from './data-table-pagination.svelte'
  import FlexRender from './flex-render.svelte'
  import * as Table from '../table/index.js'
  import BaseTableActions from '$lib/BaseTableActions.svelte'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import BaseTableHeaderOrderBy from '$lib/BaseTableHeaderOrderBy.svelte'
  import EmptyState from '$lib/EmptyState.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ArrowUp, ArrowDown, Search } from '@invopop/ui-icons'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'
  import type { DataTableProps } from './data-table-types.js'
  import { calculateColumnSizing } from './column-sizing-helpers.js'
  import { getHeaderStyle, getHeaderClasses, getCellStyle, getCellClasses } from './table-styles.js'
  import { buildColumns, setupTable } from './table-setup.js'
  import clsx from 'clsx'

  let {
    data,
    columns: columnConfig,
    disableSelection = false,
    disablePagination = false,
    disableKeyboardNavigation = false,
    disableControls = false,
    rowActions = [],
    getRowActions,
    onRowAction,
    initialPageSize = 10,
    initialPage = 0,
    initialSortColumn,
    initialSortDirection,
    initialFrozenColumns = [],
    initialColumnOrder = [],
    initialColumnVisibility = {},
    emptyState = {
      iconSource: Search,
      title: 'No results',
      description: 'Try adjusting your filters or search query'
    },
    onRowClick,
    onSelectionChange,
    filters,
    paginationSlot,
    manualPagination = false,
    manualSorting = false,
    pageCount,
    rowCount,
    onPageChange,
    onPageSizeChange,
    onSortingChange,
    onFilterChange,
    onFreezeChange,
    onColumnResize,
    onColumnOrderChange,
    onColumnVisibilityChange,
    getRowClassName,
    getRowState,
    children
  }: DataTableProps<TData> = $props()

  const enableSelection = !disableSelection
  const enablePagination = !disablePagination

  let rowSelection = $state<RowSelectionState>({})
  let columnVisibility = $state<VisibilityState>(initialColumnVisibility)
  let sorting = $state<SortingState>(
    initialSortColumn && initialSortDirection
      ? [{ id: initialSortColumn, desc: initialSortDirection === 'desc' }]
      : []
  )
  let pagination = $state<PaginationState>({ pageIndex: initialPage, pageSize: initialPageSize })
  let columnSizing = $state<ColumnSizingState>({})
  let columnSizingInfo = $state<ColumnSizingInfoState>({
    columnSizingStart: [],
    deltaOffset: null,
    deltaPercentage: null,
    isResizingColumn: false,
    startOffset: null,
    startSize: null
  })
  let columnOrder = $state<ColumnOrderState>(initialColumnOrder)
  let containerRef = $state<HTMLDivElement | null>(null)
  let columnDropdowns: Record<string, BaseDropdown> = {}
  let frozenColumns = $state<Set<string>>(new Set(initialFrozenColumns))
  let focusedRowIndex = $state<number>(-1)
  let tableBodyRef: HTMLTableSectionElement | null = null
  let animatingRows = $state<Set<any>>(new Set())
  let previousData = $state<TData[]>([])

  // Build TanStack columns from config
  const columns = $derived.by(() =>
    buildColumns<TData>(
      columnConfig,
      enableSelection,
      RowActions,
      getRowActions !== undefined || rowActions.length > 0
    )
  )

  // Calculate initial column sizes based on available width
  $effect(() => {
    if (containerRef && Object.keys(columnSizing).length === 0) {
      const containerWidth = containerRef.offsetWidth
      const newSizing = calculateColumnSizing(columns, containerWidth)
      if (newSizing) {
        columnSizing = newSizing
      }
    }
  })

  // Sync pagination pageIndex with initialPage prop (for manual pagination resets)
  $effect(() => {
    if (manualPagination) {
      pagination.pageIndex = initialPage
    }
  })

  // Reorder initial frozen columns on mount
  $effect(() => {
    if (initialFrozenColumns.length > 0 && columnOrder.length === 0) {
      initialFrozenColumns.forEach(columnId => reorderFrozenColumn(columnId))
    }
  })

  // Track selection changes
  $effect(() => {
    if (onSelectionChange) {
      const selectedRows = Object.keys(rowSelection)
        .filter((key) => rowSelection[key])
        .map((key) => data[parseInt(key)])
      onSelectionChange(selectedRows)
    }
  })

  // Track column order changes
  $effect(() => {
    if (onColumnOrderChange && columnOrder.length > 0) {
      onColumnOrderChange(columnOrder)
    }
  })

  // Track column visibility changes
  $effect(() => {
    if (onColumnVisibilityChange && Object.keys(columnVisibility).length > 0) {
      onColumnVisibilityChange(columnVisibility)
    }
  })

  const table = setupTable({
    getData: () => data,
    getColumns: () => columns,
    enableSelection,
    enablePagination,
    manualPagination,
    manualSorting,
    pageCount,
    getRowCount: () => rowCount,
    getRowSelection: () => rowSelection,
    getColumnVisibility: () => columnVisibility,
    getSorting: () => sorting,
    getPagination: () => pagination,
    getColumnSizing: () => columnSizing,
    getColumnSizingInfo: () => columnSizingInfo,
    getColumnOrder: () => columnOrder,
    setRowSelection: (value) => (rowSelection = value),
    setColumnVisibility: (value) => (columnVisibility = value),
    setSorting: (value) => (sorting = value),
    setPagination: (value) => (pagination = value),
    setColumnSizing: (value) => {
      columnSizing = value
      if (onColumnResize && Object.keys(value).length > 0) {
        onColumnResize(value)
      }
    },
    setColumnSizingInfo: (value) => (columnSizingInfo = value),
    setColumnOrder: (value) => (columnOrder = value)
  })

  function reorderFrozenColumn(columnId: string) {
    const currentOrder = table.getState().columnOrder.length > 0
      ? table.getState().columnOrder
      : table.getAllLeafColumns().map(col => col.id)

    const newOrder = [...currentOrder]
    const columnIndex = newOrder.indexOf(columnId)

    if (columnIndex > -1) {
      newOrder.splice(columnIndex, 1)

      const selectIndex = newOrder.indexOf('select')
      const insertIndex = selectIndex >= 0 ? selectIndex + 1 : 0

      let lastFrozenIndex = insertIndex
      for (let i = insertIndex; i < newOrder.length; i++) {
        if (frozenColumns.has(newOrder[i])) {
          lastFrozenIndex = i + 1
        } else {
          break
        }
      }

      newOrder.splice(lastFrozenIndex, 0, columnId)
      table.setColumnOrder(newOrder)
    }
  }

  function reorderUnfrozenColumn(columnId: string) {
    const currentOrder = table.getState().columnOrder.length > 0
      ? table.getState().columnOrder
      : table.getAllLeafColumns().map(col => col.id)

    const newOrder = [...currentOrder]
    const columnIndex = newOrder.indexOf(columnId)

    if (columnIndex > -1) {
      newOrder.splice(columnIndex, 1)

      const selectIndex = newOrder.indexOf('select')
      const insertIndex = selectIndex >= 0 ? selectIndex + 1 : 0

      // Find the first unfrozen column position (after all frozen columns)
      let firstUnfrozenIndex = insertIndex
      for (let i = insertIndex; i < newOrder.length; i++) {
        if (frozenColumns.has(newOrder[i])) {
          firstUnfrozenIndex = i + 1
        } else {
          break
        }
      }

      newOrder.splice(firstUnfrozenIndex, 0, columnId)
      table.setColumnOrder(newOrder)
    }
  }

  function handleFreezeColumn(columnId: string) {
    const isFrozen = frozenColumns.has(columnId)

    if (isFrozen) {
      frozenColumns.delete(columnId)
      frozenColumns = new Set(frozenColumns)
      reorderUnfrozenColumn(columnId)
    } else {
      frozenColumns.add(columnId)
      frozenColumns = new Set(frozenColumns)
      reorderFrozenColumn(columnId)
    }

    // Notify parent component of freeze change
    onFreezeChange?.(columnId)
  }

  function calculateFrozenOffset(columnId: string, headers: any[]): number {
    let offset = 0

    // Find the position of current column
    for (const header of headers) {
      if (header.id === columnId) {
        break
      }
      // Add width of previous frozen columns (or select column)
      if (frozenColumns.has(header.id) || header.id === 'select') {
        offset += header.getSize()
      }
    }

    return offset
  }

  function handleKeydown(event: KeyboardEvent) {
    const rows = table.getRowModel().rows
    if (rows.length === 0) return

    // Ignore if user is typing in an input or has a dropdown open
    if ((event.target as HTMLElement).tagName === 'INPUT' ||
        (event.target as HTMLElement).tagName === 'TEXTAREA') {
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (focusedRowIndex === -1 && rows.length > 0) {
          // No row focused, focus first row
          focusedRowIndex = 0
          scrollToFocusedRow()
          if (event.shiftKey && enableSelection) {
            rows[focusedRowIndex].toggleSelected(true)
          }
        } else if (focusedRowIndex < rows.length - 1) {
          // Move down
          focusedRowIndex++
          scrollToFocusedRow()
          if (event.shiftKey && enableSelection) {
            // Always select when going down
            rows[focusedRowIndex].toggleSelected(true)
          }
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (event.shiftKey && enableSelection && focusedRowIndex >= 0) {
          // Deselect current row first when going up with shift
          rows[focusedRowIndex].toggleSelected(false)
        }
        if (focusedRowIndex === -1 && rows.length > 0) {
          // No row focused, focus first row
          focusedRowIndex = 0
          scrollToFocusedRow()
        } else if (focusedRowIndex > 0) {
          // Move up
          focusedRowIndex--
          scrollToFocusedRow()
        }
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        if (focusedRowIndex >= 0 && focusedRowIndex < rows.length && enableSelection) {
          const row = rows[focusedRowIndex]
          row.toggleSelected()
        }
        break
      case 'Escape':
        focusedRowIndex = -1
        break
    }
  }

  function scrollToFocusedRow() {
    if (focusedRowIndex >= 0 && tableBodyRef) {
      const rowElement = tableBodyRef.querySelector(`[data-row-index="${focusedRowIndex}"]`)
      if (rowElement) {
        rowElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }

  // Close dropdowns on horizontal scroll
  let lastScrollLeft = 0
  function handleScroll(event: Event) {
    const target = event.target as HTMLDivElement
    if (target.scrollLeft !== lastScrollLeft) {
      lastScrollLeft = target.scrollLeft
      // Close all column dropdowns
      Object.values(columnDropdowns).forEach(dropdown => {
        if (dropdown) {
          dropdown.close()
        }
      })
    }
  }

  // Add global keyboard navigation
  onMount(() => {
    if (!disableKeyboardNavigation) {
      document.addEventListener('keydown', handleKeydown)
    }
    if (containerRef) {
      containerRef.addEventListener('scroll', handleScroll)
    }
  })

  onDestroy(() => {
    if (!disableKeyboardNavigation) {
      document.removeEventListener('keydown', handleKeydown)
    }
    if (containerRef) {
      containerRef.removeEventListener('scroll', handleScroll)
    }
  })
</script>

{#snippet StickyCellWrapper({
  children,
  align = 'left',
  isFirst = false,
  isLast = false,
  isFrozen = false,
  isLastFrozen = false
}: {
  children: any
  align?: 'left' | 'right'
  isFirst?: boolean
  isLast?: boolean
  isFrozen?: boolean
  isLastFrozen?: boolean
})}
  <div
    class={cn(
      'absolute inset-0 flex items-center bg-background group-hover/row:bg-background-default-secondary group-data-[state=selected]/row:bg-background-selected group-data-[state=selected]/row:group-hover/row:bg-background-selected group-data-[state=error]/row:bg-background-critical group-data-[state=error]/row:group-hover/row:bg-background-critical group-data-[state=success]/row:bg-background-selected group-data-[state=success]/row:group-hover/row:bg-background-selected group-data-[focused=true]/row:bg-background-default-secondary px-3 shadow-[inset_0_-1px_0_0_var(--color-border)]',
      align === 'right' ? 'justify-end' : '',
      { 'pl-4': isFirst, 'pr-4': isLast, 'border-r border-border': isFrozen && isLastFrozen }
    )}
  >
    <div class="relative z-10 flex items-center w-full">
      {@render children()}
    </div>
  </div>
{/snippet}

{#snippet RowActions({ row }: { row: Row<TData> })}
  <BaseTableActions
    actions={getRowActions ? getRowActions(row.original) : rowActions}
    onclick={(action) => {
      if (onRowAction) {
        onRowAction(action, row.original)
      }
    }}
  />
{/snippet}

{#snippet ColumnHeader({
  column,
  title,
  class: className,
  isFirst = false,
  hasSelectColumn = false,
  ...restProps
}: { column: Column<TData>; title?: string; isFirst?: boolean; hasSelectColumn?: boolean } & HTMLAttributes<HTMLDivElement>)}
  {@const isCurrency = column.columnDef.meta?.cellType === 'currency'}
  {@const needsEdgePadding = isFirst && !hasSelectColumn}
  <div
    class={cn('flex items-center w-full [th[data-last-frozen=true]_&]:border-r [th[data-last-frozen=true]_&]:border-border', className)}
    oncontextmenu={(e) => {
      e.preventDefault()
      columnDropdowns[column.id]?.toggle()
    }}
    {...restProps}
  >
    <BaseDropdown bind:this={columnDropdowns[column.id]} fullWidth usePortal={false}>
      {#snippet trigger()}
        <button
          class={clsx('data-[state=open]:bg-accent hover:bg-background-default-secondary w-full flex items-center gap-1 py-2.5', {
            'justify-end': isCurrency,
            'text-left': !isCurrency,
            'pl-4 pr-3': needsEdgePadding,
            'px-3': !needsEdgePadding
          })}
        >
          <span>
            {title || ''}
          </span>
          {#if column.getIsSorted() === 'desc'}
            <Icon src={ArrowDown} class="size-4" />
          {:else if column.getIsSorted() === 'asc'}
            <Icon src={ArrowUp} class="size-4" />
          {/if}
        </button>
      {/snippet}
      <BaseTableHeaderOrderBy
        sortDirection={column.getIsSorted() === 'asc' ? 'asc' : 'desc'}
        isActive={column.getIsSorted() !== false}
        isFrozen={frozenColumns.has(column.id)}
        showSortOptions={column.getCanSort()}
        showFilterOption={!column.columnDef.disableColumnFilter}
        onOrderBy={(direction) => {
          column.toggleSorting(direction === 'desc')
          if (manualPagination) {
            table.setPageIndex(0)
          }
          if (onSortingChange) {
            onSortingChange(column.id, direction)
          }
          columnDropdowns[column.id]?.toggle()
        }}
        onHide={() => {
          column.toggleVisibility(false)
          columnDropdowns[column.id]?.toggle()
        }}
        onFilter={() => {
          onFilterChange?.(column.id)
          columnDropdowns[column.id]?.toggle()
        }}
        onFreeze={() => {
          handleFreezeColumn(column.id)
          columnDropdowns[column.id]?.toggle()
        }}
      />
    </BaseDropdown>
  </div>
{/snippet}

<div class="flex flex-col h-full">
  <DataTableToolbar {table} {filters} {frozenColumns} onFreezeColumn={handleFreezeColumn} disabled={disableControls} />
  <div class="flex-1 overflow-hidden flex flex-col">
    <div
      bind:this={containerRef}
      class="relative bg-background flex-1 overflow-auto"
      style="overscroll-behavior-x: none;"
    >
      {#if data.length === 0}
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="pointer-events-auto">
            <EmptyState
              icon={children}
              iconSource={emptyState.iconSource}
              title={emptyState.title}
              description={emptyState.description}
            />
          </div>
        </div>
      {:else}
        <Table.Root>
          <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              {@const hasSelectColumn = headerGroup.headers.some(h => h.id === 'select')}
              <Table.Row class="hover:!bg-transparent">
              {#each headerGroup.headers as header, index (header.id)}
                {@const isLastScrollable = index === headerGroup.headers.length - 2}
                {@const isFirstHeader = index === 0}
                {@const isLastHeader = index === headerGroup.headers.length - 1}
                {@const prevHeader = index > 0 ? headerGroup.headers[index - 1] : null}
                {@const isFrozen = frozenColumns.has(header.id)}
                {@const lastFrozenHeaderId = headerGroup.headers.slice().reverse().find(h => frozenColumns.has(h.id))?.id}
                {@const isLastFrozenHeader = isFrozen && header.id === lastFrozenHeaderId}
                {@const frozenOffset = isFrozen ? calculateFrozenOffset(header.id, headerGroup.headers) : 0}
                <Table.Head
                  colspan={header.colSpan}
                  style={getHeaderStyle(header, isLastScrollable, isFrozen, frozenOffset)}
                  class={getHeaderClasses(header, isLastScrollable, isFirstHeader, isLastHeader, isFrozen, isLastFrozenHeader)}
                  data-last-frozen={isFrozen && isLastFrozenHeader ? 'true' : undefined}
                >
                  {#if !header.isPlaceholder}
                    {#if typeof header.column.columnDef.header === 'string'}
                      {@render ColumnHeader({
                        column: header.column as Column<TData>,
                        title: header.column.columnDef.header as string,
                        isFirst: isFirstHeader,
                        hasSelectColumn
                      })}
                    {:else if header.id === 'select'}
                      <div class="flex items-center">
                        <FlexRender
                          content={header.column.columnDef.header}
                          context={header.getContext()}
                        />
                      </div>
                    {:else}
                      <FlexRender
                        content={header.column.columnDef.header}
                        context={header.getContext()}
                      />
                    {/if}
                  {/if}
                  <!-- Left resize handler (resizes previous column) -->
                  {#if prevHeader && prevHeader.column.getCanResize()}
                    <!-- Left resize handler -->
                    <div
                      role="button"
                      tabindex="0"
                      aria-label="Resize previous column"
                      class="absolute left-0 top-0 h-full w-6 cursor-col-resize select-none touch-none group -ml-3"
                      onmousedown={prevHeader.getResizeHandler()}
                      ontouchstart={prevHeader.getResizeHandler()}
                    >
                      <div
                        class={cn(
                          'absolute left-1.5 top-0 h-full w-0.5 bg-border-default-secondary transition-opacity opacity-0',
                          !prevHeader.column.getIsResizing() && 'group-hover:opacity-100'
                        )}
                      ></div>
                    </div>
                  {/if}
                  {#if header.column.getCanResize()}
                    <!-- Resize handler (larger interactive area, enhanced on hover) -->
                    <div
                      role="button"
                      tabindex="0"
                      aria-label="Resize column"
                      class="absolute right-0 top-0 h-full w-6 cursor-col-resize select-none touch-none group -mr-3"
                      onmousedown={header.getResizeHandler()}
                      ontouchstart={header.getResizeHandler()}
                    >
                      <div
                        class={cn(
                          'absolute right-1.5 top-0 h-full w-0.5 bg-border-default-secondary transition-opacity opacity-0',
                          !header.column.getIsResizing() && 'group-hover:opacity-100'
                        )}
                      ></div>
                    </div>
                  {/if}
                </Table.Head>
              {/each}
            </Table.Row>
          {/each}
        </Table.Header>
        <Table.Body bind:ref={tableBodyRef}>
          {#each table.getRowModel().rows as row, rowIndex (row.id)}
            {@const rowState = getRowState?.(row.original as TData)}
            {@const isError = rowState?.isError ?? false}
            {@const isSuccess = rowState?.isSuccess ?? false}
            {@const dataState = row.getIsSelected() ? 'selected' : isError ? 'error' : isSuccess ? 'success' : undefined}
            <Table.Row
              data-state={dataState}
              data-row-index={rowIndex}
              data-focused={focusedRowIndex === rowIndex ? 'true' : undefined}
              class={cn(clsx('shadow-[inset_0_-1px_0_0_var(--color-border)]', {
                'cursor-pointer': onRowClick
              }), getRowClassName?.(row.original as TData))}
              onclick={() => onRowClick?.(row.original as TData)}
            >
              {#each row.getVisibleCells() as cell, index (cell.id)}
                {@const visibleCells = row.getVisibleCells()}
                {@const allCells = row.getAllCells()}
                {@const isLastScrollable = index === visibleCells.length - 2}
                {@const firstDataColumnIndex = visibleCells.findIndex(
                  (c) => c.column.id !== 'select' && c.column.id !== 'actions'
                )}
                {@const isFirstDataColumn = index === firstDataColumnIndex}
                {@const isFirstCell = index === 0}
                {@const isLastCell = index === visibleCells.length - 1}
                {@const isFrozen = frozenColumns.has(cell.column.id)}
                {@const lastFrozenColumnId = allCells.map(c => c.column).reverse().find(col => frozenColumns.has(col.id))?.id}
                {@const isLastFrozen = isFrozen && cell.column.id === lastFrozenColumnId}
                {@const frozenOffset = isFrozen ? calculateFrozenOffset(cell.column.id, allCells.map(c => c.column)) : 0}
                <Table.Cell
                  style={getCellStyle(cell, isLastScrollable, isFrozen, frozenOffset)}
                  class={getCellClasses(
                    cell,
                    isLastScrollable,
                    isFirstDataColumn,
                    isFirstCell,
                    isLastCell,
                    isFrozen
                  )}
                >
                  {#if cell.column.id === 'actions'}
                    {@render StickyCellWrapper({
                      align: 'right',
                      children: CellContent,
                      isFirst: isFirstCell,
                      isLast: isLastCell
                    })}
                    {#snippet CellContent()}
                      <FlexRender
                        content={cell.column.columnDef.cell}
                        context={cell.getContext()}
                      />
                    {/snippet}
                  {:else if cell.column.id === 'select' || isFrozen}
                    {@render StickyCellWrapper({
                      align: 'left',
                      children: CellContent,
                      isFirst: isFirstCell,
                      isLast: isLastCell,
                      isFrozen: isFrozen,
                      isLastFrozen: isLastFrozen
                    })}
                    {#snippet CellContent()}
                      <FlexRender
                        content={cell.column.columnDef.cell}
                        context={cell.getContext()}
                      />
                    {/snippet}
                  {:else}
                    <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                  {/if}
                </Table.Cell>
              {/each}
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
      {/if}
    </div>
    {#if enablePagination}
      <DataTablePagination
        {table}
        {data}
        {rowCount}
        {manualPagination}
        {onPageChange}
        {onPageSizeChange}
        disabled={disableControls}
      >
        {#if paginationSlot}
          {@render paginationSlot()}
        {/if}
      </DataTablePagination>
    {/if}
  </div>
</div>
