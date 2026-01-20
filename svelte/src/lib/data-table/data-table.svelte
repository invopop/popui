<script lang="ts">
  import {
    type ColumnDef,
    type ColumnFiltersState,
    type ColumnSizingState,
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
  import { labels, priorities, statuses } from './data.js'
  import { taskSchema, type Task } from './schemas.js'
  import { renderComponent, renderSnippet } from './render-helpers.js'
  import InputCheckbox from '$lib/InputCheckbox.svelte'
  import { createRawSnippet } from 'svelte'
  import TagStatus from '$lib/TagStatus.svelte'
  import BaseTableActions from '$lib/BaseTableActions.svelte'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import BaseTableHeaderOrderBy from '$lib/BaseTableHeaderOrderBy.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ArrowUp, ArrowDown, ChevronUp, SidebarHide } from '@invopop/ui-icons'
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
  let columnSizingInfo = $state({})
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
        id: 100,
        title: 300,
        status: 150,
        priority: 120,
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
      maxSize: 40
    },
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return renderSnippet(ColumnHeader, {
          column,
          title: 'Task'
        })
      },
      cell: ({ row }) => {
        const idSnippet = createRawSnippet<[{ id: string }]>((getId) => {
          const { id } = getId()
          return {
            render: () => `<div class="truncate">${id}</div>`
          }
        })

        return renderSnippet(idSnippet, {
          id: row.original.id
        })
      },
      enableSorting: false,
      enableHiding: false,
      size: 100,
      minSize: 80
    },
    {
      accessorKey: 'title',
      header: ({ column }) => renderSnippet(ColumnHeader, { column, title: 'Title' }),
      cell: ({ row }) => {
        return renderSnippet(TitleCell, {
          labelValue: row.original.label,
          value: row.original.title
        })
      },
      size: 300,
      minSize: 150
    },
    {
      accessorKey: 'status',
      header: ({ column }) =>
        renderSnippet(ColumnHeader, {
          column,
          title: 'Status'
        }),
      cell: ({ row }) => {
        return renderSnippet(StatusCell, {
          value: row.original.status
        })
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      size: 150,
      minSize: 100
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => {
        return renderSnippet(ColumnHeader, {
          title: 'Priority',
          column
        })
      },
      cell: ({ row }) => {
        return renderSnippet(PriorityCell, {
          value: row.original.priority
        })
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      size: 120,
      minSize: 100
    },
    {
      id: 'actions',
      cell: ({ row }) => renderSnippet(RowActions, { row }),
      enableResizing: false,
      size: 44,
      minSize: 44,
      maxSize: 44
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
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })
</script>

{#snippet StatusCell({ value }: { value: string })}
  {@const status = statuses.find((status) => status.value === value)}
  {#if status}
    <div class="flex items-center min-w-0">
      <Icon src={status.icon} class="text-muted-foreground me-2 size-4 flex-shrink-0" />
      <span class="truncate">{status.label}</span>
    </div>
  {/if}
{/snippet}

{#snippet TitleCell({ value, labelValue }: { value: string; labelValue: string })}
  {@const label = labels.find((label) => label.value === labelValue)}
  <div class="flex space-x-2 min-w-0">
    {#if label}
      <TagStatus label={label.label} />
    {/if}
    <span class="truncate font-medium min-w-0">
      {value}
    </span>
  </div>
{/snippet}

{#snippet PriorityCell({ value }: { value: string })}
  {@const priority = priorities.find((priority) => priority.value === value)}
  {#if priority}
    <div class="flex items-center min-w-0">
      <Icon src={priority.icon} class="text-muted-foreground me-2 size-4 flex-shrink-0" />
      <span class="truncate">{priority.label}</span>
    </div>
  {/if}
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

<div class="space-y-4">
  <DataTableToolbar {table} />
  <div bind:this={containerRef} class="relative bg-white">
    <!-- Full-width background with horizontal lines -->
    <div
      class="absolute inset-0 pointer-events-none z-0 [background-image:repeating-linear-gradient(to_bottom,transparent_0px,transparent_39px,var(--color-border-default-default)_39px,var(--color-border-default-default)_40px)]"
    ></div>
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
                    ? `width: ${header.getSize()}px; min-width: ${header.getSize()}px; max-width: ${header.getSize()}px; border-bottom: 1px solid transparent;`
                    : isLastScrollable
                      ? `min-width: ${header.getSize()}px;`
                      : `min-width: ${header.getSize()}px; max-width: ${header.getSize()}px;`}
                  class={cn(
                    'relative',
                    header.id === 'actions' ? 'sticky right-0 text-right bg-white' : '',
                    isLastScrollable ? 'w-full' : '',
                    header.column.getIsResizing()
                      ? 'border-r-2 border-r-border-default-secondary'
                      : ''
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
                      class="absolute right-0 top-0 h-full w-0.5 cursor-col-resize select-none touch-none group"
                      onmousedown={header.getResizeHandler()}
                      ontouchstart={header.getResizeHandler()}
                    >
                      <div
                        class={cn(
                          'absolute right-0 top-0 h-full w-full bg-border-default-secondary transition-opacity',
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
                    : isLastScrollable
                      ? `min-width: ${cell.column.getSize()}px;`
                      : `min-width: ${cell.column.getSize()}px; max-width: ${cell.column.getSize()}px;`}
                  class={cn(
                    cell.column.id === 'actions'
                      ? 'sticky right-0 text-right !p-0'
                      : '',
                    isLastScrollable ? 'w-full' : '',
                    cell.column.getIsResizing()
                      ? 'border-r-2 border-r-border-default-secondary'
                      : ''
                  )}
                >
                  {#if cell.column.id === 'actions'}
                    <div class="h-[38px] bg-white group-hover/row:bg-transparent group-data-[state=selected]/row:bg-background-default-secondary flex items-center justify-end px-3 relative">
                      {#if isFirstRow}
                        <div class="absolute inset-x-0 top-0 h-[1px] bg-border" style="transform: translateY(-2px);"></div>
                      {/if}
                      <div class="absolute inset-x-0 bottom-0 h-[1px] bg-border group-hover/row:bg-transparent" style={isFirstRow ? "" : "transform: translateY(0.5px);"}></div>
                      <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                    </div>
                  {:else}
                    <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                  {/if}
                </Table.Cell>
              {/each}
            </Table.Row>
          {:else}
            <Table.Row>
              <Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </div>
  <DataTablePagination {table} />
</div>
