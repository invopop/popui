<script lang="ts" generics="TData">
  import type { Table } from '@tanstack/table-core'
  import type { Snippet } from 'svelte'
  import { DataTableViewOptions } from './index.js'

  let { table, filters, frozenColumns, onFreezeColumn }: { table: Table<TData>; filters?: Snippet; frozenColumns: Set<string>; onFreezeColumn: (columnId: string) => void } = $props()
</script>

<div class="flex items-center justify-between px-4 py-3">
  {#if filters}
    <div class="flex-1">
      {@render filters()}
    </div>
  {/if}
  <DataTableViewOptions {table} {frozenColumns} {onFreezeColumn} />
</div>
