<script lang="ts" generics="TData">
  import type { Table } from '@tanstack/table-core'
  import { DataTableViewOptions } from './index.js'

  let { table }: { table: Table<TData> } = $props()
</script>

<div class="flex items-center justify-end">
  <DataTableViewOptions {table} />
</div>
