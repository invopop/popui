<script lang="ts" generics="TData">
  import type { DataTableRowProps } from './data-table-types.js'
  import * as Table from '../table/index.js'
  import FlexRender from './flex-render.svelte'
  import Skeleton from '$lib/skeleton/skeleton.svelte'
  import SkeletonAvatar from '$lib/skeleton/skeleton-avatar.svelte'
  import { cn } from '$lib/utils.js'
  import { calculateFrozenOffset } from './data-table-helpers.js'
  import { getCellStyle, getCellClasses } from './table-styles.js'
  import clsx from 'clsx'

  let {
    row,
    rowIndex,
    frozenColumns,
    focusedRowIndex,
    loading = false,
    onRowClick,
    getRowClassName,
    getRowState,
    StickyCellWrapper
  }: DataTableRowProps<TData> = $props()

  const rowState = getRowState?.(row.original as TData)
  const isError = rowState?.isError ?? false
  const isSuccess = rowState?.isSuccess ?? false
  const dataState = row.getIsSelected()
    ? 'selected'
    : isError
      ? 'error'
      : isSuccess
        ? 'success'
        : undefined
</script>

<Table.Row
  data-state={dataState}
  data-row-index={rowIndex}
  data-focused={focusedRowIndex === rowIndex ? 'true' : undefined}
  class={cn(
    clsx('shadow-[inset_0_-1px_0_0_var(--color-border)]', {
      'cursor-pointer': onRowClick && !loading,
      'pointer-events-none': loading
    }),
    getRowClassName?.(row.original as TData)
  )}
  onclick={() => !loading && onRowClick?.(row.original as TData)}
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
    {@const lastFrozenColumnId = allCells
      .map((c) => c.column)
      .reverse()
      .find((col) => frozenColumns.has(col.id))?.id}
    {@const isLastFrozen = isFrozen && cell.column.id === lastFrozenColumnId}
    {@const frozenOffset = isFrozen
      ? calculateFrozenOffset(
          cell.column.id,
          allCells.map((c) => c.column),
          frozenColumns
        )
      : 0}
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
          <div class={loading ? 'opacity-30' : ''}>
            <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
          </div>
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
          {#if loading && cell.column.id !== 'select'}
            {@const loadingConfig = cell.column.columnDef.meta?.loadingConfig || {}}
            {@const cellType = cell.column.columnDef.meta?.cellType}
            {@const isBoolean = cellType === 'boolean'}
            {#if isBoolean}
              <Skeleton class="size-4" />
            {:else}
              {@const lines = loadingConfig.lines ?? 1}
              {@const showAvatar = loadingConfig.showAvatar ?? false}
              {@const avatarSize = loadingConfig.avatarSize ?? 32}
              <div class="flex items-center gap-3 w-full">
                {#if showAvatar}
                  <SkeletonAvatar size={avatarSize} />
                {/if}
                <div class="flex flex-col gap-2 flex-1">
                  {#each Array(lines) as _, i}
                    <Skeleton
                      class="h-4 w-full"
                      style="max-width: {i === lines - 1 && lines > 1 ? '80%' : '100%'}"
                    />
                  {/each}
                </div>
              </div>
            {/if}
          {:else}
            <div class={cell.column.id === 'select' && loading ? 'opacity-30' : ''}>
              <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
            </div>
          {/if}
        {/snippet}
      {:else if loading}
        {@const loadingConfig = cell.column.columnDef.meta?.loadingConfig || {}}
        {@const cellType = cell.column.columnDef.meta?.cellType}
        {@const isBoolean = cellType === 'boolean'}
        {#if isBoolean}
          <div class="px-3">
            <Skeleton class="size-4" />
          </div>
        {:else}
          {@const lines = loadingConfig.lines ?? 1}
          {@const showAvatar = loadingConfig.showAvatar ?? false}
          {@const avatarSize = loadingConfig.avatarSize ?? 32}
          <div class="flex items-center gap-3 w-full px-3">
            {#if showAvatar}
              <SkeletonAvatar size={avatarSize} />
            {/if}
            <div class="flex flex-col gap-2 flex-1">
              {#each Array(lines) as _, i}
                <Skeleton
                  class="h-4 w-full"
                  style="max-width: {i === lines - 1 && lines > 1 ? '80%' : '100%'}"
                />
              {/each}
            </div>
          </div>
        {/if}
      {:else}
        <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
      {/if}
    </Table.Cell>
  {/each}
</Table.Row>
