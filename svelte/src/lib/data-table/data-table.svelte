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
    rowActions = [],
    getRowActions,
    onRowAction,
    initialPageSize = 10,
    initialPage = 0,
    initialSortColumn,
    initialSortDirection,
    emptyState = {
      iconSource: Search,
      title: 'No results',
      description: 'Try adjusting your filters or search query'
    },
    onRowClick,
    onSelectionChange,
    filters,
    paginationSelectedSlot,
    paginationUnselectedSlot,
    manualPagination = false,
    pageCount,
    rowCount,
    onPageChange,
    onPageSizeChange,
    onSortingChange,
    onFilterChange,
    onFreezeChange,
    getRowClassName
  }: DataTableProps<TData> = $props()

  const enableSelection = !disableSelection
  const enablePagination = !disablePagination

  let rowSelection = $state<RowSelectionState>({})
  let columnVisibility = $state<VisibilityState>({})
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
  let columnOrder = $state<ColumnOrderState>([])
  let containerRef = $state<HTMLDivElement | null>(null)
  let columnDropdowns: Record<string, BaseDropdown> = {}
  let frozenColumns = $state<Set<string>>(new Set())

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
    pagination.pageIndex = initialPage
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

  const table = setupTable({
    getData: () => data,
    getColumns: () => columns,
    enableSelection,
    enablePagination,
    manualPagination,
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
    setColumnSizing: (value) => (columnSizing = value),
    setColumnSizingInfo: (value) => (columnSizingInfo = value),
    setColumnOrder: (value) => (columnOrder = value)
  })

  function handleFreezeColumn(columnId: string) {
    const isFrozen = frozenColumns.has(columnId)

    if (isFrozen) {
      // Unfreeze
      frozenColumns.delete(columnId)
      frozenColumns = new Set(frozenColumns)
    } else {
      // Freeze
      frozenColumns.add(columnId)
      frozenColumns = new Set(frozenColumns)

      // Reorder columns to move frozen column to the left
      const currentOrder = table.getState().columnOrder.length > 0
        ? table.getState().columnOrder
        : table.getAllLeafColumns().map(col => col.id)

      const newOrder = [...currentOrder]
      const columnIndex = newOrder.indexOf(columnId)

      if (columnIndex > -1) {
        // Remove from current position
        newOrder.splice(columnIndex, 1)

        // Find position to insert (after select column if present, otherwise at start)
        const selectIndex = newOrder.indexOf('select')
        const insertIndex = selectIndex >= 0 ? selectIndex + 1 : 0

        // Find the last frozen column position
        let lastFrozenIndex = insertIndex
        for (let i = insertIndex; i < newOrder.length; i++) {
          if (frozenColumns.has(newOrder[i])) {
            lastFrozenIndex = i + 1
          } else {
            break
          }
        }

        // Insert after the last frozen column
        newOrder.splice(lastFrozenIndex, 0, columnId)

        table.setColumnOrder(newOrder)
      }
    }
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
</script>

{#snippet StickyCellWrapper({
  children,
  align = 'left',
  isFirst = false,
  isLast = false,
  isFrozen = false
}: {
  children: any
  align?: 'left' | 'right'
  isFirst?: boolean
  isLast?: boolean
  isFrozen?: boolean
})}
  <div
    class={cn(
      'absolute inset-0 flex items-center bg-background group-hover/row:bg-background-default-secondary group-data-[state=selected]/row:bg-background-selected px-3',
      align === 'right' ? 'justify-end' : '',
      { 'pl-4': isFirst, 'pr-4': isLast, 'border-r border-border': isFrozen }
    )}
  >
    <div class="relative z-10 flex items-center">
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
  ...restProps
}: { column: Column<TData>; title?: string } & HTMLAttributes<HTMLDivElement>)}
  {@const isCurrency = column.columnDef.meta?.cellType === 'currency'}
  <div class={cn('flex items-center w-full', className)} {...restProps}>
    <BaseDropdown bind:this={columnDropdowns[column.id]} fullWidth>
      {#snippet trigger()}
        <button
          class={clsx('data-[state=open]:bg-accent w-full flex items-center gap-1 py-2.5', {
            'justify-end': isCurrency,
            'text-left': !isCurrency
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
          // Reset to first page when sorting changes (same as page size change)
          if (manualPagination) {
            table.setPageIndex(0)
            onPageChange?.(1)
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
          onFreezeChange?.(column.id)
          columnDropdowns[column.id]?.toggle()
        }}
      />
    </BaseDropdown>
  </div>
{/snippet}

<div class="flex flex-col h-full">
  <DataTableToolbar {table} {filters} {frozenColumns} />
  <div class="flex-1 overflow-hidden flex flex-col">
    {#if data.length === 0}
      <div class="flex-1 flex items-center justify-center bg-background">
        <EmptyState
          iconSource={emptyState.iconSource}
          title={emptyState.title}
          description={emptyState.description}
        />
      </div>
    {:else}
      <div
        bind:this={containerRef}
        class="relative bg-background flex-1 overflow-auto"
        style="overscroll-behavior-x: none;"
      >
        <Table.Root>
          <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              <Table.Row class="hover:!bg-transparent border-t border-b border-border">
              {#each headerGroup.headers as header, index (header.id)}
                {@const isLastScrollable = index === headerGroup.headers.length - 2}
                {@const isFirstHeader = index === 0}
                {@const isLastHeader = index === headerGroup.headers.length - 1}
                {@const prevHeader = index > 0 ? headerGroup.headers[index - 1] : null}
                {@const isFrozen = frozenColumns.has(header.id)}
                {@const frozenOffset = isFrozen ? calculateFrozenOffset(header.id, headerGroup.headers) : 0}
                <Table.Head
                  colspan={header.colSpan}
                  style={getHeaderStyle(header, isLastScrollable, isFrozen, frozenOffset)}
                  class={getHeaderClasses(header, isLastScrollable, isFirstHeader, isLastHeader, isFrozen)}
                >
                  {#if !header.isPlaceholder}
                    {#if typeof header.column.columnDef.header === 'string'}
                      {@render ColumnHeader({
                        column: header.column as Column<TData>,
                        title: header.column.columnDef.header as string
                      })}
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
        <Table.Body>
          {#each table.getRowModel().rows as row (row.id)}
            <Table.Row
              data-state={row.getIsSelected() ? 'selected' : undefined}
              class={cn('border-b border-border', getRowClassName?.(row.original as TData))}
              onclick={() => onRowClick?.(row.original as TData)}
            >
              {#each row.getVisibleCells() as cell, index (cell.id)}
                {@const visibleCells = row.getVisibleCells()}
                {@const isLastScrollable = index === visibleCells.length - 2}
                {@const firstDataColumnIndex = visibleCells.findIndex(
                  (c) => c.column.id !== 'select' && c.column.id !== 'actions'
                )}
                {@const isFirstDataColumn = index === firstDataColumnIndex}
                {@const isFirstCell = index === 0}
                {@const isLastCell = index === visibleCells.length - 1}
                {@const isFrozen = frozenColumns.has(cell.column.id)}
                {@const frozenOffset = isFrozen ? calculateFrozenOffset(cell.column.id, visibleCells.map(c => c.column)) : 0}
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
                      isFrozen: isFrozen
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
    </div>
    {/if}
    {#if enablePagination}
      <DataTablePagination
        {table}
        {data}
        {rowCount}
        {manualPagination}
        selectedSlot={paginationSelectedSlot}
        unselectedSlot={paginationUnselectedSlot}
        {onPageChange}
        {onPageSizeChange}
      />
    {/if}
  </div>
</div>
