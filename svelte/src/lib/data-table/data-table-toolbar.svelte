<script lang="ts" generics="TData">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Close } from '@invopop/ui-icons'
  import type { Table } from '@tanstack/table-core'
  import { DataTableFacetedFilter, DataTableViewOptions } from './index.js'
  import Button from '../button/button.svelte'
  import InputText from '../InputText.svelte'
  import { priorities, statuses } from './data.js'

  let { table }: { table: Table<TData> } = $props()

  const isFiltered = $derived(table.getState().columnFilters.length > 0)
  const statusCol = $derived(table.getColumn('status'))
  const priorityCol = $derived(table.getColumn('priority'))

  let filterValue = $state((table.getColumn('title')?.getFilterValue() as string) ?? '')
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-2">
    <InputText
      placeholder="Filter tasks..."
      bind:value={filterValue}
      oninput={(val) => {
        table.getColumn('title')?.setFilterValue(val)
      }}
      class="h-8 w-[150px] lg:w-[250px]"
    />

    {#if statusCol}
      <DataTableFacetedFilter column={statusCol} title="Status" options={statuses} />
    {/if}
    {#if priorityCol}
      <DataTableFacetedFilter column={priorityCol} title="Priority" options={priorities} />
    {/if}

    {#if isFiltered}
      <Button variant="ghost" onclick={() => table.resetColumnFilters()} class="h-8 px-2 lg:px-3">
        Reset
        <Icon src={Close} class="ml-2 size-4" />
      </Button>
    {/if}
  </div>
  <DataTableViewOptions {table} />
</div>
