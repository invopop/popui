<script lang="ts" generics="TData">
  import {
    type ColumnSizingState,
    type ColumnSizingInfoState,
    type ColumnOrderState,
    type PaginationState,
    type Row,
    type RowSelectionState,
    type SortingState,
    type VisibilityState
  } from '@tanstack/table-core'
  import { onMount, onDestroy } from 'svelte'
  import DataTableToolbar from './data-table-toolbar.svelte'
  import DataTablePagination from './data-table-pagination.svelte'
  import DataTableHeaderCell from './data-table-header-cell.svelte'
  import DataTableRow from './data-table-row.svelte'
  import FlexRender from './flex-render.svelte'
  import * as Table from '../table/index.js'
  import BaseTableActions from '$lib/BaseTableActions.svelte'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import EmptyState from '$lib/EmptyState.svelte'
  import Skeleton from '$lib/skeleton/skeleton.svelte'
  import SkeletonAvatar from '$lib/skeleton/skeleton-avatar.svelte'
  import { Search } from '@invopop/ui-icons'
  import { cn } from '$lib/utils.js'
  import type { DataTableProps } from './data-table-types.js'
  import { calculateColumnSizing } from './column-sizing-helpers.js'
  import { getCellStyle, getCellClasses } from './table-styles.js'
  import { buildColumns, setupTable } from './table-setup.js'
  import {
    reorderFrozenColumn,
    reorderUnfrozenColumn,
    calculateFrozenOffset,
    handleScrollEvent,
    shouldIgnoreKeyEvent,
    handleArrowDown,
    handleArrowUp,
    handleSelectKey
  } from './data-table-helpers.js'
  import clsx from 'clsx'

  let {
    data,
    columns: columnConfig,
    loading = false,
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
    initialColumnSizing = {},
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
  let columnSizing = $state<ColumnSizingState>(initialColumnSizing)
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
  let columnDropdowns = $state<Record<string, BaseDropdown>>({})
  let frozenColumns = $state<Set<string>>(new Set(initialFrozenColumns))
  let focusedRowIndex = $state<number>(-1)
  let tableBodyRef = $state<HTMLTableSectionElement | null>(null)
  let tableRenderKey = $state<number>(0) // Force re-render when visibility changes

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
      initialFrozenColumns.forEach((columnId) =>
        reorderFrozenColumn(columnId, table, frozenColumns)
      )
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

  const table = setupTable<TData>({
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
    setColumnVisibility: (value) => {
      columnVisibility = value
      // Increment render key to force table rebuild after visibility changes
      tableRenderKey++
    },
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

  function handleFreezeColumn(columnId: string) {
    const isFrozen = frozenColumns.has(columnId)

    if (isFrozen) {
      frozenColumns.delete(columnId)
      frozenColumns = new Set(frozenColumns)
      reorderUnfrozenColumn(columnId, table, frozenColumns)
    } else {
      frozenColumns.add(columnId)
      frozenColumns = new Set(frozenColumns)
      reorderFrozenColumn(columnId, table, frozenColumns)
    }

    // Notify parent component of freeze change
    onFreezeChange?.(columnId)
  }

  function handleKeydown(event: KeyboardEvent) {
    const rows = table.getRowModel().rows
    if (rows.length === 0) return
    if (shouldIgnoreKeyEvent(event)) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusedRowIndex = handleArrowDown(
          focusedRowIndex,
          rows,
          event.shiftKey,
          enableSelection,
          scrollToFocusedRow
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        focusedRowIndex = handleArrowUp(
          focusedRowIndex,
          rows,
          event.shiftKey,
          enableSelection,
          scrollToFocusedRow
        )
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        handleSelectKey(focusedRowIndex, rows, enableSelection)
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
    lastScrollLeft = handleScrollEvent(event, lastScrollLeft, columnDropdowns)
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
      'absolute inset-0 flex items-center bg-background group-hover/row:bg-background-default-secondary group-data-[state=selected]/row:bg-background-selected group-data-[state=selected]/row:group-hover/row:bg-background-selected group-data-[state=error]/row:bg-background-critical group-data-[state=error]/row:group-hover/row:bg-background-critical group-data-[state=warning]/row:bg-background-warning group-data-[state=warning]/row:group-hover/row:bg-background-warning group-data-[state=success]/row:bg-background-selected group-data-[state=success]/row:group-hover/row:bg-background-selected group-data-[focused=true]/row:bg-background-default-secondary px-3 shadow-[inset_0_-1px_0_0_var(--color-border)]',
      {
        'justify-end': align === 'right',
        'pl-4': isFirst,
        'pr-4': isLast,
        'border-r border-border': isFrozen && isLastFrozen
      }
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

<div class="flex flex-col h-full">
  <DataTableToolbar
    {table}
    {filters}
    {frozenColumns}
    onFreezeColumn={handleFreezeColumn}
    disabled={disableControls}
  />
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
            {#each table.getHeaderGroups() as headerGroup (`${headerGroup.id}-${tableRenderKey}`)}
              <Table.Row class="hover:!bg-transparent">
                {#each headerGroup.headers as header, index (header.id)}
                  <DataTableHeaderCell
                    {header}
                    {index}
                    headers={headerGroup.headers}
                    {frozenColumns}
                    bind:columnDropdowns
                    onSortingChange={(columnId, direction) => {
                      if (manualPagination) {
                        table.setPageIndex(0)
                      }
                      onSortingChange?.(columnId, direction)
                    }}
                    {onFilterChange}
                    onFreezeChange={handleFreezeColumn}
                    {manualPagination}
                    {loading}
                  />
                {/each}
              </Table.Row>
            {/each}
          </Table.Header>
          <Table.Body bind:ref={tableBodyRef}>
            {#each table.getRowModel().rows as row, rowIndex (row.id)}
              <DataTableRow
                {row}
                {rowIndex}
                {frozenColumns}
                {focusedRowIndex}
                {loading}
                {onRowClick}
                {getRowClassName}
                {getRowState}
                {StickyCellWrapper}
              />
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
        disabled={disableControls || loading}
      >
        {#if paginationSlot}
          {@render paginationSlot()}
        {/if}
      </DataTablePagination>
    {/if}
  </div>
</div>
