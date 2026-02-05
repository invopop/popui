<script lang="ts">
  import DataTable from '../../lib/data-table/data-table.svelte'
  import BaseButton from '../../lib/BaseButton.svelte'
  import type { DataTableProps } from '../../lib/data-table/data-table-types.js'
  import { ArrowUp } from '@invopop/ui-icons'

  type Props<TData> = DataTableProps<TData>

  let props: Props<any> = $props()
</script>

{#snippet paginationSlot()}
  <BaseButton icon={ArrowUp}>Export</BaseButton>
{/snippet}

<DataTable
  {...props}
  paginationSlot={paginationSlot}
  onPageChange={(pageIndex) => {
    console.log('Page changed to:', pageIndex)
  }}
  onPageSizeChange={(pageSize) => {
    console.log('Page size changed to:', pageSize)
  }}
/>
