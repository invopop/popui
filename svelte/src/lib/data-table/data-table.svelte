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
  import { createSvelteTable } from './data-table-svelte.svelte.js'
  import FlexRender from './flex-render.svelte'
  import * as Table from '../table/index.js'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import { labels, priorities, statuses } from './data.js'
  import { taskSchema, type Task } from './schemas.js'
  import { renderComponent, renderSnippet } from './render-helpers.js'
  import InputCheckbox from '$lib/InputCheckbox.svelte'
  import { createRawSnippet } from 'svelte'
  import TagStatus from '$lib/TagStatus.svelte'
  import BaseButton from '$lib/BaseButton.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import {
    Options,
    ChevronRight,
    ChevronLeft,
    ArrowUp,
    ArrowDown,
    ChevronUp,
    SidebarHide
  } from '@invopop/ui-icons'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  let { data }: { data: Task[] } = $props()

  let rowSelection = $state<RowSelectionState>({})
  let columnVisibility = $state<VisibilityState>({})
  let columnFilters = $state<ColumnFiltersState>([])
  let sorting = $state<SortingState>([])
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 })
  let columnSizing = $state<ColumnSizingState>({})
  let containerRef = $state<HTMLDivElement | null>(null)

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
      size: 50,
      minSize: 50,
      maxSize: 50
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
      <TagStatus label={label.label} class="flex-shrink-0" />
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
  <BaseDropdown>
    {#snippet trigger()}
      <button
        class="data-[state=open]:bg-muted flex h-8 w-8 p-0 items-center justify-center rounded-md border border-border-default-secondary bg-background text-foreground hover:border-border-default-secondary-hover"
      >
        <Icon src={Options} class="size-4" />
        <span class="sr-only">Open Menu</span>
      </button>
    {/snippet}
    <DrawerContext>
      <button class="w-full text-left px-2 py-1.5 hover:bg-background-default-tertiary-hover"
        >Edit</button
      >
      <button class="w-full text-left px-2 py-1.5 hover:bg-background-default-tertiary-hover"
        >Make a copy</button
      >
      <button class="w-full text-left px-2 py-1.5 hover:bg-background-default-tertiary-hover"
        >Favorite</button
      >
      <div class="my-1 h-px bg-border-default-secondary"></div>
      <div class="px-2 py-1.5">
        <div class="font-medium mb-1">Labels</div>
        {#each labels as label (label.value)}
          <button
            class="w-full text-left px-2 py-1 hover:bg-background-default-tertiary-hover rounded"
            class:bg-background-default-tertiary={task.label === label.value}
          >
            {label.label}
          </button>
        {/each}
      </div>
      <div class="my-1 h-px bg-border-default-secondary"></div>
      <button
        class="w-full text-left px-2 py-1.5 hover:bg-background-default-tertiary-hover flex items-center justify-between"
      >
        <span>Delete</span>
        <span class="text-muted-foreground text-xs">⌘⌫</span>
      </button>
    </DrawerContext>
  </BaseDropdown>
{/snippet}

{#snippet Pagination({ table }: { table: TableType<Task> })}
  <div class="flex items-center justify-between px-2">
    <div class="text-muted-foreground flex-1 text-sm">
      {table.getFilteredSelectedRowModel().rows.length} of
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Rows per page</p>
        <InputSelect
          value={`${table.getState().pagination.pageSize}`}
          options={[10, 20, 30, 40, 50].map((size) => ({ value: `${size}`, label: `${size}` }))}
          onchange={(value) => {
            table.setPageSize(Number(value))
          }}
        />
      </div>
      <div class="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of
        {table.getPageCount()}
      </div>
      <div class="flex items-center space-x-2">
        <BaseButton
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          onclick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {#snippet children()}
            <span class="sr-only">Go to first page</span>
            <Icon src={ChevronLeft} class="size-4" />
          {/snippet}
        </BaseButton>
        <BaseButton
          variant="outline"
          class="size-8 p-0"
          onclick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {#snippet children()}
            <span class="sr-only">Go to previous page</span>
            <Icon src={ChevronLeft} class="size-4" />
          {/snippet}
        </BaseButton>
        <BaseButton
          variant="outline"
          class="size-8 p-0"
          onclick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {#snippet children()}
            <span class="sr-only">Go to next page</span>
            <Icon src={ChevronRight} class="size-4" />
          {/snippet}
        </BaseButton>
        <BaseButton
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          onclick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {#snippet children()}
            <span class="sr-only">Go to last page</span>
            <Icon src={ChevronRight} class="size-4" />
          {/snippet}
        </BaseButton>
      </div>
    </div>
  </div>
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
    <div class={cn('flex items-center', className)} {...restProps}>
      <BaseDropdown>
        {#snippet trigger()}
          <button
            class="data-[state=open]:bg-accent -ms-3 h-8 flex items-center gap-1 px-3 py-1 rounded-md hover:bg-background-default-tertiary-hover"
          >
            <span>
              {title}
            </span>
            {#if column.getIsSorted() === 'desc'}
              <Icon src={ArrowDown} class="size-4" />
            {:else if column.getIsSorted() === 'asc'}
              <Icon src={ArrowUp} class="size-4" />
            {:else}
              <Icon src={ChevronUp} class="size-4" />
            {/if}
          </button>
        {/snippet}
        <DrawerContext>
          <button
            class="w-full text-left px-2 py-1.5 hover:bg-background-default-tertiary-hover flex items-center gap-2"
            onclick={() => column.toggleSorting(false)}
          >
            <Icon src={ArrowUp} class="text-muted-foreground/70 size-3.5" />
            Asc
          </button>
          <button
            class="w-full text-left px-2 py-1.5 hover:bg-background-default-tertiary-hover flex items-center gap-2"
            onclick={() => column.toggleSorting(true)}
          >
            <Icon src={ArrowDown} class="text-muted-foreground/70 size-3.5" />
            Desc
          </button>
          <div class="my-1 h-px bg-border-default-secondary"></div>
          <button
            class="w-full text-left px-2 py-1.5 hover:bg-background-default-tertiary-hover flex items-center gap-2"
            onclick={() => column.toggleVisibility(false)}
          >
            <Icon src={SidebarHide} class="text-muted-foreground/70 size-3.5" />
            Hide
          </button>
        </DrawerContext>
      </BaseDropdown>
    </div>
  {/if}
{/snippet}

<div class="space-y-4">
  <DataTableToolbar {table} />
  <div bind:this={containerRef}>
    <div class="overflow-x-auto">
      <Table.Root style={`width: ${table.getTotalSize()}px;`}>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head
                colspan={header.colSpan}
                style={`min-width: ${header.getSize()}px; max-width: ${header.getSize()}px;`}
                class="relative"
              >
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
                {#if header.column.getCanResize()}
                  <div
                    class={cn(
                      'absolute right-0 top-0 h-full w-4 cursor-col-resize select-none touch-none hover:bg-border-default-secondary/50 group',
                      header.column.getIsResizing() ? 'bg-border-default-secondary/50' : ''
                    )}
                    onmousedown={header.getResizeHandler()}
                    ontouchstart={header.getResizeHandler()}
                  >
                    <div
                      class={cn(
                        'absolute right-0 top-0 h-full w-0.5 bg-border-default-secondary transition-opacity',
                        header.column.getIsResizing() ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
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
          <Table.Row data-state={row.getIsSelected() && 'selected'}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell style={`min-width: ${cell.column.getSize()}px; max-width: ${cell.column.getSize()}px;`}>
                <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
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
  {@render Pagination({ table })}
</div>
