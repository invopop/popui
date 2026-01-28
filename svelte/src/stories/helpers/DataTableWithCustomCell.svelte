<script lang="ts">
  import DataTable from '../../lib/data-table/data-table.svelte'
  import { renderSnippet } from '../../lib/data-table/index.js'
  import type { DataTableProps } from '../../lib/data-table/data-table-types.js'

  type Props<TData> = DataTableProps<TData>

  let props: Props<any> = $props()
</script>

{#snippet supplierCell(row: any)}
  {#if row}
    <div class="flex flex-col">
      <p class="text-foreground font-medium">{row.supplier}</p>
      {#if row.supplierEmail}
        <p class="text-foreground-default-secondary text-sm">{row.supplierEmail}</p>
      {/if}
    </div>
  {/if}
{/snippet}

<DataTable
  {...props}
  columns={props.columns.map((col) => {
    if (col.id === 'supplier') {
      return {
        ...col,
        cell: (value, row) => renderSnippet(supplierCell, row)
      }
    }
    return col
  })}
/>
