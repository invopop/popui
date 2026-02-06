<script lang="ts" generics="TData">
  import type { Table } from '@tanstack/table-core'
  import type { Snippet } from 'svelte'
  import { DataTableViewOptions } from './index.js'
  import clsx from 'clsx'

  let { table, filters, frozenColumns, onFreezeColumn, disabled = false }: { table: Table<TData>; filters?: Snippet; frozenColumns: Set<string>; onFreezeColumn: (columnId: string) => void; disabled?: boolean } = $props()
</script>

<div class={clsx('flex items-center justify-between px-4 py-2.5', {
  'pointer-events-none opacity-30': disabled
})}>
  {#if filters}
    <div class="flex-1">
      {@render filters()}
    </div>
  {/if}
  <DataTableViewOptions {table} {frozenColumns} {onFreezeColumn} />
</div>
