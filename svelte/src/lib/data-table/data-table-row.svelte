<script lang="ts" generics="TData">
  import type { DataTableRowProps } from './data-table-types.js'
  import * as Table from '../table/index.js'
  import DataTableCell from './data-table-cell.svelte'
  import { cn } from '$lib/utils.js'
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

  const rowState = $derived(getRowState?.(row.original as TData))
  const isError = $derived(rowState?.isError ?? false)
  const isSuccess = $derived(rowState?.isSuccess ?? false)
  const isWarning = $derived(rowState?.isWarning ?? false)
  const dataState = $derived.by(() => {
    if (row.getIsSelected()) return 'selected'
    if (isError) return 'error'
    if (isWarning) return 'warning'
    if (isSuccess) return 'success'
    return undefined
  })
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
    <DataTableCell
      {cell}
      {index}
      visibleCells={row.getVisibleCells()}
      allCells={row.getAllCells()}
      {frozenColumns}
      {loading}
      {StickyCellWrapper}
    />
  {/each}
</Table.Row>
