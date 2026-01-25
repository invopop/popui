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

  let {
    data,
    columns: columnConfig,
    disableSelection = false,
    disablePagination = false,
    rowActions = [],
    getRowActions,
    onRowAction,
    initialPageSize = 10,
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
    onPageChange,
    onPageSizeChange
  }: DataTableProps<TData> = $props()

  const enableSelection = !disableSelection
  const enablePagination = !disablePagination

  let rowSelection = $state<RowSelectionState>({})
  let columnVisibility = $state<VisibilityState>({})
  let sorting = $state<SortingState>([])
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: initialPageSize })
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

  // Build TanStack columns from config
  const columns = $derived.by(() =>
    buildColumns<TData>(columnConfig, enableSelection, RowActions, getRowActions !== undefined || rowActions.length > 0)
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
</script>

{#snippet StickyCellWrapper({
  children,
  align = 'left'
}: {
  children: any
  align?: 'left' | 'right'
})}
  <div
    class={cn(
      'h-10 flex items-center relative group-hover/row:bg-background-default-secondary group-data-[state=selected]/row:bg-background-selected',
      align === 'right' ? 'justify-end pl-3 pr-6' : 'pl-6 pr-3'
    )}
  >
    <div class="relative z-10">
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
  {#if !column?.getCanSort()}
    <div class={className} {...restProps}>
      {title || ''}
    </div>
  {:else}
    <div class={cn('flex items-center w-full', className)} {...restProps}>
      <BaseDropdown fullWidth>
        {#snippet trigger()}
          <button
            class="data-[state=open]:bg-accent w-full flex items-center gap-1 py-2.5 text-left"
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
          onOrderBy={(direction) => column.toggleSorting(direction === 'desc')}
          onHide={() => column.toggleVisibility(false)}
        />
      </BaseDropdown>
    </div>
  {/if}
{/snippet}

<div class="flex flex-col h-full">
  <DataTableToolbar {table} {filters} />
  <div class="flex-1 overflow-hidden flex flex-col">
    <div bind:this={containerRef} class="relative bg-background flex-1 overflow-auto">
      <Table.Root>
        <Table.Header>
          {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
            <Table.Row class="hover:!bg-transparent border-b border-border">
              {#each headerGroup.headers as header, index (header.id)}
                {@const isLastScrollable = index === headerGroup.headers.length - 2}
                <Table.Head
                  colspan={header.colSpan}
                  style={getHeaderStyle(header, isLastScrollable)}
                  class={getHeaderClasses(header, isLastScrollable)}
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
                  {#if header.column.getCanResize()}
                    <!-- Always visible vertical border -->
                    <div
                      class={cn(
                        'absolute right-0 top-1/2 -translate-y-1/2 h-3 w-px bg-background-default-tertiary',
                        header.column.getIsResizing() && 'opacity-0'
                      )}
                    ></div>
                    <!-- Resize handler (larger interactive area, enhanced on hover) -->
                    <div
                      role="button"
                      tabindex="0"
                      aria-label="Resize column"
                      class="absolute right-0 top-0 h-full w-3 cursor-col-resize select-none touch-none group -mr-1.5"
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
              class="border-b border-border"
              onclick={() => onRowClick?.(row.original as TData)}
            >
              {#each row.getVisibleCells() as cell, index (cell.id)}
                {@const isLastScrollable = index === row.getVisibleCells().length - 2}
                {@const visibleCells = row.getVisibleCells()}
                {@const firstDataColumnIndex = visibleCells.findIndex(
                  (c) => c.column.id !== 'select' && c.column.id !== 'actions'
                )}
                {@const isFirstDataColumn = index === firstDataColumnIndex}
                <Table.Cell
                  style={getCellStyle(cell, isLastScrollable)}
                  class={getCellClasses(cell, isLastScrollable, isFirstDataColumn)}
                >
                  {#if cell.column.id === 'actions'}
                    {@render StickyCellWrapper({
                      align: 'right',
                      children: CellContent
                    })}
                    {#snippet CellContent()}
                      <FlexRender
                        content={cell.column.columnDef.cell}
                        context={cell.getContext()}
                      />
                    {/snippet}
                  {:else if cell.column.id === 'select'}
                    {@render StickyCellWrapper({
                      align: 'left',
                      children: CellContent
                    })}
                    {#snippet CellContent()}
                      <FlexRender
                        content={cell.column.columnDef.cell}
                        context={cell.getContext()}
                      />
                    {/snippet}
                  {:else}
                    <FlexRender
                      content={cell.column.columnDef.cell}
                      context={cell.getContext()}
                    />
                  {/if}
                </Table.Cell>
              {/each}
            </Table.Row>
          {:else}
            <Table.Row class="hover:!bg-transparent">
              <Table.Cell colspan={columns.length} class="h-48">
                <EmptyState
                  iconSource={emptyState.iconSource}
                  title={emptyState.title}
                  description={emptyState.description}
                />
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
    {#if enablePagination}
      <DataTablePagination
        {table}
        selectedSlot={paginationSelectedSlot}
        unselectedSlot={paginationUnselectedSlot}
        {onPageChange}
        {onPageSizeChange}
      />
    {/if}
  </div>
</div>
