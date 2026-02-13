<script lang="ts" generics="TData">
  import type { DataTableHeaderCellProps } from './data-table-types.js'
  import type { Column, Header } from '@tanstack/table-core'
  import type { HTMLAttributes } from 'svelte/elements'
  import * as Table from '../table/index.js'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import BaseTableHeaderOrderBy from '$lib/BaseTableHeaderOrderBy.svelte'
  import FlexRender from './flex-render.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ArrowUp, ArrowDown } from '@invopop/ui-icons'
  import { cn } from '$lib/utils.js'
  import { calculateFrozenOffset } from './data-table-helpers.js'
  import { getHeaderStyle, getHeaderClasses } from './table-styles.js'
  import clsx from 'clsx'

  let {
    header,
    index,
    headers,
    frozenColumns,
    columnDropdowns = $bindable({}),
    onSortingChange,
    onFilterChange,
    onFreezeChange,
    loading = false
  }: DataTableHeaderCellProps<TData> = $props()

  const isLastScrollable = $derived(index === headers.length - 2)
  const isFirstHeader = $derived(index === 0)
  const isLastHeader = $derived(index === headers.length - 1)
  const prevHeader = $derived(index > 0 ? headers[index - 1] : null)
  const isFrozen = $derived(frozenColumns.has(header.id))
  const lastFrozenHeaderId = $derived(
    headers
      .slice()
      .reverse()
      .find((h) => frozenColumns.has(h.id))?.id
  )
  const isLastFrozenHeader = $derived(isFrozen && header.id === lastFrozenHeaderId)
  const frozenOffset = $derived(isFrozen ? calculateFrozenOffset(header.id, headers, frozenColumns) : 0)
  const hasSelectColumn = $derived(headers.some((h) => h.id === 'select'))
</script>

{#snippet ResizeHandle({
  side,
  targetHeader,
  label
}: {
  side: 'left' | 'right'
  targetHeader: Header<TData, unknown>
  label: string
})}
  <div
    role="button"
    tabindex="0"
    aria-label={label}
    class={cn(
      'absolute top-0 h-full w-6 cursor-col-resize select-none touch-none group z-0',
      side === 'left' ? 'left-0 -ml-3' : 'right-0 -mr-3'
    )}
    onmousedown={targetHeader.getResizeHandler()}
    ontouchstart={targetHeader.getResizeHandler()}
  >
    <div
      class={cn(
        'absolute top-0 h-full w-0.5 bg-border-default-secondary transition-opacity opacity-0',
        side === 'left' ? 'left-1.5' : 'right-1.5',
        !targetHeader.column.getIsResizing() && 'group-hover:opacity-100'
      )}
    ></div>
  </div>
{/snippet}

{#snippet ColumnHeader({
  column,
  title,
  class: className,
  isFirst = false,
  hasSelectColumn = false,
  ...restProps
}: {
  column: Column<TData>
  title?: string
  isFirst?: boolean
  hasSelectColumn?: boolean
} & HTMLAttributes<HTMLDivElement>)}
  {@const isCurrency = column.columnDef.meta?.cellType === 'currency'}
  {@const needsEdgePadding = isFirst && !hasSelectColumn}
  <div
    class={cn(
      'flex items-center w-full [th[data-last-frozen=true]_&]:border-r [th[data-last-frozen=true]_&]:border-border',
      className
    )}
    oncontextmenu={(e) => {
      e.preventDefault()
      columnDropdowns[column.id]?.toggle()
    }}
    {...restProps}
  >
    <BaseDropdown bind:this={columnDropdowns[column.id]} fullWidth usePortal={false}>
      {#snippet trigger()}
        <button
          class={clsx(
            'data-[state=open]:bg-accent hover:bg-background-default-secondary w-full flex items-center gap-1 py-2.5',
            {
              'justify-end': isCurrency,
              'text-left': !isCurrency,
              'pl-4 pr-3': needsEdgePadding,
              'px-3': !needsEdgePadding
            }
          )}
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
        showFilterOption={!column.columnDef.meta?.disableColumnFilter}
        showHideOption={column.getCanHide()}
        onOrderBy={(direction) => {
          column.toggleSorting(direction === 'desc')
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
          onFreezeChange?.(column.id)
          columnDropdowns[column.id]?.toggle()
        }}
      />
    </BaseDropdown>
  </div>
{/snippet}

<Table.Head
  colspan={header.colSpan}
  style={getHeaderStyle(header, isLastScrollable, isFrozen, frozenOffset)}
  class={getHeaderClasses(
    header,
    isLastScrollable,
    isFirstHeader,
    isLastHeader,
    isFrozen,
    isLastFrozenHeader
  )}
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
      <div class={cn('flex items-center', loading && 'opacity-30')}>
        <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
      </div>
    {:else}
      <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
    {/if}
  {/if}
  {#if prevHeader && prevHeader.column.getCanResize()}
    {@render ResizeHandle({ side: 'left', targetHeader: prevHeader, label: 'Resize previous column' })}
  {/if}
  {#if header.column.getCanResize()}
    {@render ResizeHandle({ side: 'right', targetHeader: header, label: 'Resize column' })}
  {/if}
</Table.Head>
