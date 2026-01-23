<script lang="ts">
  import DataTable from '../../lib/data-table/data-table.svelte'
  import BaseButton from '../../lib/BaseButton.svelte'
  import type { DataTableProps } from '../../lib/data-table/data-table-types.js'
  import { ArrowUp, Download, Workflow } from '@invopop/ui-icons'

  type Props<TData> = DataTableProps<TData>

  let props: Props<any> = $props()
</script>

{#snippet selectedSlot()}
  <div class="flex items-center gap-2">
    <BaseButton icon={Download}>Download CSV</BaseButton>
    <BaseButton icon={Workflow} variant="primary">Run Workflow</BaseButton>
  </div>
{/snippet}

{#snippet unselectedSlot()}
  <div class="flex items-center gap-2">
    <BaseButton icon={ArrowUp}>Export</BaseButton>
  </div>
{/snippet}

<DataTable
  {...props}
  paginationSelectedSlot={selectedSlot}
  paginationUnselectedSlot={unselectedSlot}
  onPageChange={(pageIndex) => {
    console.log('Page changed to:', pageIndex)
  }}
  onPageSizeChange={(pageSize) => {
    console.log('Page size changed to:', pageSize)
  }}
/>
