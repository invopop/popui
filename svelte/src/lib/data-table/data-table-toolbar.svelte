<script lang="ts" generics="TData">
  import type { Table } from '@tanstack/table-core'
  import type { Snippet } from 'svelte'
  import { DataTableViewOptions } from './index.js'

  let { table, filters }: { table: Table<TData>; filters?: Snippet } = $props()
</script>

<div class="flex items-center justify-between px-6 py-4">
  {#if filters}
    <div class="flex-1">
      {@render filters()}
    </div>
  {/if}
  <DataTableViewOptions {table} />
</div>
