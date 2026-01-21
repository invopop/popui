<script lang="ts">
  import {
    type ColumnDef,
    type ColumnFiltersState,
    type ColumnSizingState,
    type ColumnSizingInfoState,
    type ColumnOrderState,
    type PaginationState,
    type Row,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
    type Table as TableType,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Column
  } from '@tanstack/table-core'
  import DataTableToolbar from './data-table-toolbar.svelte'
  import DataTablePagination from './data-table-pagination.svelte'
  import { createSvelteTable } from './data-table-svelte.svelte.js'
  import FlexRender from './flex-render.svelte'
  import * as Table from '../table/index.js'
  import { labels, statuses, states } from './data.js'
  import { taskSchema, type Task } from './schemas.js'
  import { renderComponent, renderSnippet } from './render-helpers.js'
  import InputCheckbox from '$lib/InputCheckbox.svelte'
  import { createRawSnippet } from 'svelte'
  import TagStatus from '$lib/TagStatus.svelte'
  import StatusLabel from '$lib/StatusLabel.svelte'
  import BaseTableActions from '$lib/BaseTableActions.svelte'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import BaseTableHeaderOrderBy from '$lib/BaseTableHeaderOrderBy.svelte'
  import ButtonUuidCopy from '$lib/ButtonUuidCopy.svelte'
  import EmptyState from '$lib/EmptyState.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import {
    ArrowUp,
    ArrowDown,
    ChevronUp,
    SidebarHide,
    Search,
    Signature,
    Sign
  } from '@invopop/ui-icons'
  import type { TableSortBy } from '$lib/types.js'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  let { data }: { data: Task[] } = $props()

  let rowSelection = $state<RowSelectionState>({})
  let columnVisibility = $state<VisibilityState>({})
  let columnFilters = $state<ColumnFiltersState>([])
  let sorting = $state<SortingState>([])
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 })
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

  const rowActions = [
    { label: 'Edit', value: 'edit' },
    { label: 'Make a copy', value: 'copy' },
    { label: 'Favorite', value: 'favorite' },
    { label: '', value: '', separator: true },
    { label: 'Delete', value: 'delete', destructive: true }
  ]

  // Calculate initial column sizes based on available width
  $effect(() => {
    if (containerRef && Object.keys(columnSizing).length === 0) {
      const containerWidth = containerRef.offsetWidth
      // Define default sizes as percentages that sum to reasonable widths
      const defaultSizes = {
        select: 40,
        invoice: 150,
        signed: 60,
        state: 100,
        supplier: 220,
        customer: 220,
        total: 140,
        createdAt: 140,
        actions: 50
      }

      const totalDefaultSize = Object.values(defaultSizes).reduce((sum, size) => sum + size, 0)

      // If container is wider than default, scale columns proportionally
      if (containerWidth > totalDefaultSize) {
        const scale = containerWidth / totalDefaultSize
        const newSizing: ColumnSizingState = {}
        Object.entries(defaultSizes).forEach(([key, value]) => {
          newSizing[key] = Math.floor(value * scale)
        })
        columnSizing = newSizing
      }
    }
  })

  const columns: ColumnDef<Task>[] = [
    {
      id: 'select',
      header: ({ table }) =>
        renderComponent(InputCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          onchange: (value: boolean) => table.toggleAllPageRowsSelected(value),
          indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
          'aria-label': 'Select all'
        }),
      cell: ({ row }) =>
        renderComponent(InputCheckbox, {
          checked: row.getIsSelected(),
          onchange: (value: boolean) => row.toggleSelected(value),
          'aria-label': 'Select row'
        }),
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      size: 40,
      minSize: 40,
      maxSize: 40,
      meta: { label: 'Select' }
    },
    {
      accessorKey: 'invoice',
      header: ({ column }) => {
        return renderSnippet(ColumnHeader, {
          column,
          title: 'Invoice'
        })
      },
      cell: ({ row }) => {
        const invoiceSnippet = createRawSnippet<[{ invoice: string }]>((getInvoice) => {
          const { invoice } = getInvoice()
          return {
            render: () => `<div class="truncate font-medium">${invoice}</div>`
          }
        })

        return renderSnippet(invoiceSnippet, {
          invoice: row.original.invoice
        })
      },
      enableSorting: false,
      enableHiding: false,
      size: 150,
      minSize: 120,
      meta: { label: 'Invoice' }
    },
    {
      accessorKey: 'signed',
      header: ({ column }) => renderSnippet(ColumnHeader, { column, title: '' }),
      cell: ({ row }) => {
        return renderSnippet(SignedCell, {
          value: row.original.signed
        })
      },
      enableSorting: false,
      enableResizing: false,
      size: 60,
      minSize: 60,
      maxSize: 60,
      meta: { label: 'Signed' }
    },
    {
      accessorKey: 'state',
      header: ({ column }) => renderSnippet(ColumnHeader, { column, title: 'State' }),
      cell: ({ row }) => {
        return renderSnippet(StateCell, {
          value: row.original.state
        })
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      size: 100,
      minSize: 80,
      meta: { label: 'State' }
    },
    {
      accessorKey: 'supplier',
      header: ({ column }) => renderSnippet(ColumnHeader, { column, title: 'Supplier' }),
      cell: ({ row }) => {
        const supplierSnippet = createRawSnippet<[{ supplier: string }]>((getSupplier) => {
          const { supplier } = getSupplier()
          return {
            render: () => `<div class="truncate">${supplier}</div>`
          }
        })

        return renderSnippet(supplierSnippet, {
          supplier: row.original.supplier
        })
      },
      size: 220,
      minSize: 150,
      meta: { label: 'Supplier' }
    },
    {
      accessorKey: 'customer',
      header: ({ column }) => renderSnippet(ColumnHeader, { column, title: 'Customer' }),
      cell: ({ row }) => {
        const customerSnippet = createRawSnippet<[{ customer: string }]>((getCustomer) => {
          const { customer } = getCustomer()
          return {
            render: () => `<div class="truncate">${customer}</div>`
          }
        })

        return renderSnippet(customerSnippet, {
          customer: row.original.customer
        })
      },
      size: 220,
      minSize: 150,
      meta: { label: 'Customer' }
    },
    {
      accessorKey: 'total',
      header: ({ column }) => renderSnippet(ColumnHeader, { column, title: 'Total' }),
      cell: ({ row }) => {
        return renderSnippet(TotalCell, {
          value: row.original.total
        })
      },
      size: 140,
      minSize: 120,
      meta: { label: 'Total' }
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => renderSnippet(ColumnHeader, { column, title: 'Created at' }),
      cell: ({ row }) => {
        return renderSnippet(DateCell, {
          value: row.original.createdAt
        })
      },
      size: 140,
      minSize: 120,
      meta: { label: 'Created at' }
    },
    {
      id: 'actions',
      cell: ({ row }) => renderSnippet(RowActions, { row }),
      enableResizing: false,
      size: 44,
      minSize: 44,
      maxSize: 44,
      meta: { label: 'Actions' }
    }
  ]

  const table = createSvelteTable({
    get data() {
      return data
    },
    state: {
      get sorting() {
        return sorting
      },
      get columnVisibility() {
        return columnVisibility
      },
      get rowSelection() {
        return rowSelection
      },
      get columnFilters() {
        return columnFilters
      },
      get pagination() {
        return pagination
      },
      get columnSizing() {
        return columnSizing
      },
      get columnSizingInfo() {
        return columnSizingInfo
      },
      get columnOrder() {
        return columnOrder
      }
    },
    columns,
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onRowSelectionChange: (updater) => {
      if (typeof updater === 'function') {
        rowSelection = updater(rowSelection)
      } else {
        rowSelection = updater
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === 'function') {
        sorting = updater(sorting)
      } else {
        sorting = updater
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === 'function') {
        columnFilters = updater(columnFilters)
      } else {
        columnFilters = updater
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === 'function') {
        columnVisibility = updater(columnVisibility)
      } else {
        columnVisibility = updater
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        pagination = updater(pagination)
      } else {
        pagination = updater
      }
    },
    onColumnSizingChange: (updater) => {
      if (typeof updater === 'function') {
        columnSizing = updater(columnSizing)
      } else {
        columnSizing = updater
      }
    },
    onColumnSizingInfoChange: (updater) => {
      if (typeof updater === 'function') {
        columnSizingInfo = updater(columnSizingInfo)
      } else {
        columnSizingInfo = updater
      }
    },
    onColumnOrderChange: (updater) => {
      if (typeof updater === 'function') {
        columnOrder = updater(columnOrder)
      } else {
        columnOrder = updater
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })
</script>

{#snippet StickyCellWrapper({
  children,
  isFirstRow,
  align = 'left'
}: {
  children: any
  isFirstRow: boolean
  align?: 'left' | 'right'
})}
  <div
    class={cn(
      'h-[39px] flex items-center px-3 relative group-hover/row:bg-background-default-secondary group-data-[state=selected]/row:bg-background-selected',
      align === 'right' ? 'justify-end' : ''
    )}
    style="transform: translateY(-0.5px);"
  >
    {#if isFirstRow}
      <div
        class="absolute inset-x-0 top-0 h-[1px] bg-border z-20"
        style="transform: translateY(-1.5px);"
      ></div>
    {/if}
    <div
      class="absolute inset-x-0 bottom-0 h-[1px] bg-border z-20"
      style={isFirstRow ? '' : 'transform: translateY(0.5px);'}
    ></div>
    <div class="relative z-10">
      {@render children()}
    </div>
  </div>
{/snippet}

{#snippet SignedCell({ value }: { value: boolean })}
  {#if value}
    <div class="flex justify-center">
      <Icon src={Sign} class="size-4 text-text-secondary-default" />
    </div>
  {/if}
{/snippet}

{#snippet StateCell({ value }: { value: string })}
  {@const state = states.find((state) => state.value === value)}
  {#if state}
    <TagStatus label={state.label} status={state.color} dot />
  {/if}
{/snippet}

{#snippet TotalCell({ value }: { value: string })}
  <span class="font-mono text-base text-foreground">
    {value}
  </span>
{/snippet}

{#snippet DateCell({ value }: { value: string })}
  <span class="font-mono text-base text-foreground">
    {value}
  </span>
{/snippet}

{#snippet RowActions({ row }: { row: Row<Task> })}
  {@const task = taskSchema.parse(row.original)}
  <BaseTableActions
    actions={rowActions}
    onclick={(action) => {
      console.log('Action clicked:', action, 'for task:', task)
    }}
  />
{/snippet}

{#snippet ColumnHeader({
  column,
  title,
  class: className,
  ...restProps
}: { column: Column<Task>; title: string } & HTMLAttributes<HTMLDivElement>)}
  {#if !column?.getCanSort()}
    <div class={className} {...restProps}>
      {title}
    </div>
  {:else}
    <div class={cn('flex items-center w-full', className)} {...restProps}>
      <BaseDropdown fullWidth>
        {#snippet trigger()}
          <button
            class="data-[state=open]:bg-accent w-full flex items-center gap-1 py-2.5 text-left"
          >
            <span>
              {title}
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

<div class="flex flex-col gap-4">
  <DataTableToolbar {table} />
  <div class="flex flex-col gap-[5px]">
    <div bind:this={containerRef} class="relative bg-background">
      <!-- Full-width background with horizontal lines (only when table has data) -->
      {#if data.length > 0}
        <div
          class="absolute inset-0 pointer-events-none z-0 [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_39px,var(--color-border-default-default)_39px,var(--color-border-default-default)_40px)]"
        ></div>
      {/if}
      <div class="overflow-x-auto relative z-10">
        <Table.Root>
          <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              <Table.Row class="hover:!bg-transparent">
                {#each headerGroup.headers as header, index (header.id)}
                  {@const isLastScrollable = index === headerGroup.headers.length - 2}
                  <Table.Head
                    colspan={header.colSpan}
                    style={header.id === 'actions'
                      ? `width: ${header.getSize()}px; min-width: ${header.getSize()}px; max-width: ${header.getSize()}px;`
                      : header.id === 'select'
                        ? `width: ${header.getSize()}px; min-width: ${header.getSize()}px; max-width: ${header.getSize()}px;`
                        : isLastScrollable
                          ? `min-width: ${header.getSize()}px;`
                          : `min-width: ${header.getSize()}px; max-width: ${header.getSize()}px;`}
                    class={cn(
                      'relative whitespace-nowrap overflow-hidden',
                      header.id === 'actions' ? 'sticky right-0 text-right bg-white' : '',
                      header.id === 'select' ? 'sticky left-0 bg-white z-10' : '',
                      isLastScrollable ? 'w-full' : '',
                      header.column.getIsResizing()
                        ? 'border-r-2 border-r-border-default-secondary'
                        : '',
                      !header.column.getCanSort() ? 'hover:!bg-transparent' : ''
                    )}
                  >
                    {#if !header.isPlaceholder}
                      <FlexRender
                        content={header.column.columnDef.header}
                        context={header.getContext()}
                      />
                    {/if}
                    {#if header.column.getCanResize()}
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
                            'absolute right-1.5 top-0 h-full w-0.5 bg-border-default-secondary transition-opacity',
                            header.column.getIsResizing()
                              ? 'opacity-0'
                              : 'opacity-0 group-hover:opacity-100'
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
            {#each table.getRowModel().rows as row, rowIndex (row.id)}
              <Table.Row data-state={row.getIsSelected() ? 'selected' : undefined}>
                {#each row.getVisibleCells() as cell, index (cell.id)}
                  {@const isLastScrollable = index === row.getVisibleCells().length - 2}
                  {@const isFirstRow = rowIndex === 0}
                  <Table.Cell
                    style={cell.column.id === 'actions'
                      ? `width: ${cell.column.getSize()}px; min-width: ${cell.column.getSize()}px; max-width: ${cell.column.getSize()}px;`
                      : cell.column.id === 'select'
                        ? `width: ${cell.column.getSize()}px; min-width: ${cell.column.getSize()}px; max-width: ${cell.column.getSize()}px;`
                        : isLastScrollable
                          ? `min-width: ${cell.column.getSize()}px;`
                          : `min-width: ${cell.column.getSize()}px; max-width: ${cell.column.getSize()}px;`}
                    class={cn(
                      'whitespace-nowrap overflow-hidden',
                      cell.column.id === 'actions' ? 'sticky right-0 text-right !p-0' : '',
                      cell.column.id === 'select' ? 'sticky left-0 !p-0 z-10' : '',
                      isLastScrollable ? 'w-full' : '',
                      cell.column.getIsResizing()
                        ? 'border-r-2 border-r-border-default-secondary'
                        : ''
                    )}
                  >
                    {#if cell.column.id === 'actions'}
                      {@render StickyCellWrapper({
                        isFirstRow,
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
                        isFirstRow,
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
              <Table.Row>
                <Table.Cell colspan={columns.length} class="h-48">
                  <EmptyState
                    iconSource={Search}
                    title="No results"
                    description="Try adjusting your filters or search query"
                  />
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
    <DataTablePagination {table} />
  </div>
</div>
