<script lang="ts">
  import DataTable from '../../lib/data-table/data-table.svelte'
  import InputSearch from '../../lib/InputSearch.svelte'
  import InputSelect from '../../lib/InputSelect.svelte'
  import type { DataTableProps } from '../../lib/data-table/data-table-types.js'

  type Props<TData> = DataTableProps<TData> & {
    disableControls?: boolean
  }

  let props: Props<any> = $props()

  let searchValue = $state('')
  let stateFilter = $state('')

  const stateOptions = [
    { value: '', label: 'All states' },
    { value: 'paid', label: 'Paid' },
    { value: 'sent', label: 'Sent' },
    { value: 'empty', label: 'Empty' },
    { value: 'error', label: 'Error' }
  ]
</script>

{#snippet filters()}
  <div class="flex items-center gap-2">
    <div class="w-64">
      <InputSearch
        bind:value={searchValue}
        placeholder="Search invoices..."
        size="sm"
      />
    </div>
    <div class="w-40">
      <InputSelect
        bind:value={stateFilter}
        options={stateOptions}
        placeholder="Filter by state"
        size="sm"
      />
    </div>
  </div>
{/snippet}

<DataTable
  {...props}
  filters={filters}
/>
