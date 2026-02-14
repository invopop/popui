<script lang="ts" generics="TData">
  import type { DataTableCellProps } from './data-table-types.js'
  import * as Table from '../table/index.js'
  import FlexRender from './flex-render.svelte'
  import CellSkeleton from './cells/cell-skeleton.svelte'
  import { calculateFrozenOffset } from './data-table-helpers.js'
  import { getCellStyle, getCellClasses } from './table-styles.js'

  let {
    cell,
    index,
    visibleCells,
    allCells,
    frozenColumns,
    loading = false,
    StickyCellWrapper
  }: DataTableCellProps<TData> = $props()

  const isLastScrollable = $derived(index === visibleCells.length - 2)
  const firstDataColumnIndex = $derived(
    visibleCells.findIndex((c) => c.column.id !== 'select' && c.column.id !== 'actions')
  )
  const isFirstDataColumn = $derived(index === firstDataColumnIndex)
  const isFirstCell = $derived(index === 0)
  const isLastCell = $derived(index === visibleCells.length - 1)
  const isFrozen = $derived(frozenColumns.has(cell.column.id))
  const lastFrozenColumnId = $derived.by(() =>
    allCells
      .map((c) => c.column)
      .reverse()
      .find((col) => frozenColumns.has(col.id))?.id
  )
  const isLastFrozen = $derived(isFrozen && cell.column.id === lastFrozenColumnId)
  const frozenOffset = $derived.by(() =>
    isFrozen
      ? calculateFrozenOffset(
          cell.column.id,
          allCells.map((c) => c.column),
          frozenColumns
        )
      : 0
  )
  const loadingConfig = $derived(cell.column.columnDef.meta?.loadingConfig || {})
  const cellType = $derived(cell.column.columnDef.meta?.cellType)
  const isBoolean = $derived(cellType === 'boolean')
</script>

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
      <div class="w-full {loading ? 'opacity-30' : ''}">
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
        <CellSkeleton {isBoolean} {loadingConfig} />
      {:else}
        <div class="w-full {cell.column.id === 'select' && loading ? 'opacity-30' : ''}">
          <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
        </div>
      {/if}
    {/snippet}
  {:else if loading}
    <CellSkeleton {isBoolean} {loadingConfig} withPadding />
  {:else}
    <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
  {/if}
</Table.Cell>
