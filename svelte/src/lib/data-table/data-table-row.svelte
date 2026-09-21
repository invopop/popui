<script lang="ts" generics="TData">
  import type { DataTableRowProps } from './data-table-types.js'
  import * as Table from '../table/index.js'
  import DataTableCell from './data-table-cell.svelte'
  import { cn } from '$lib/utils.js'
  import { isModifiedClick, openInNewTab } from '$lib/helpers.js'
  import clsx from 'clsx'

  let {
    row,
    rowIndex,
    frozenColumns,
    focusedRowIndex,
    loading = false,
    onRowClick,
    getRowHref,
    onFocusRow,
    getRowClassName,
    getRowState,
    StickyCellWrapper
  }: DataTableRowProps<TData> = $props()

  const href = $derived(getRowHref?.(row.original as TData))

  function isInteractiveTarget(event: MouseEvent) {
    return !!(event.target as HTMLElement | null)?.closest('a, button, input, select, textarea')
  }
  const rowState = $derived(getRowState?.(row.original as TData))
  const isError = $derived(rowState?.isError ?? false)
  const isSuccess = $derived(rowState?.isSuccess ?? false)
  const isWarning = $derived(rowState?.isWarning ?? false)
  const isSelected = $derived(rowState?.isSelected ?? false)
  const dataState = $derived.by(() => {
    if (row.getIsSelected() || isSelected) return 'selected'
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
  onclick={(event) => {
    if (loading) return
    if (href && isModifiedClick(event) && !isInteractiveTarget(event)) {
      openInNewTab(href)
      return
    }
    onFocusRow?.()
    onRowClick?.(row.original as TData)
  }}
  onauxclick={(event) => {
    // Middle button fires auxclick, not click.
    if (loading || !href || event.button !== 1 || isInteractiveTarget(event)) return
    event.preventDefault()
    openInNewTab(href)
  }}
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
