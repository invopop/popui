<script lang="ts">
  import DataTable from '../../lib/data-table/data-table.svelte'
  import type { DataTableProps } from '../../lib/data-table/data-table-types.js'

  type Props<TData> = DataTableProps<TData>

  let { onRowClick, ...props }: Props<any> = $props()
</script>

<DataTable {...props} />
