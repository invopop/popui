<script lang="ts">
  import DataTable from '../../lib/data-table/data-table.svelte'
  import { renderSnippet } from '../../lib/data-table/index.js'
  import StepIconList from '../../lib/StepIconList.svelte'
  import type { DataTableProps } from '../../lib/data-table/data-table-types.js'
  import type { StepIcon } from '../../lib/types.js'

  type Props<TData> = DataTableProps<TData>

  let props: Props<any> = $props()

  // Mock step icons
  const mockStepIcons = [
    { name: 'Hashtag', url: 'https://api.iconify.design/mdi/pound.svg' },
    { name: 'Sign', url: 'https://api.iconify.design/mdi/pencil.svg' },
    { name: 'Invoice', url: 'https://api.iconify.design/mdi/file-document.svg' },
    { name: 'Slack', url: 'https://api.iconify.design/mdi/slack.svg' },
    { name: 'Email', url: 'https://api.iconify.design/mdi/email.svg' },
    { name: 'GitHub', url: 'https://api.iconify.design/mdi/github.svg' },
    { name: 'Twitter', url: 'https://api.iconify.design/mdi/twitter.svg' }
  ]

  // Generate random steps for each row
  function generateSteps(rowIndex: number): StepIcon[] {
    const count = Math.floor(Math.random() * 5) + 2 // 2-6 steps
    return Array.from({ length: count }, (_, i) =>
      mockStepIcons[i % mockStepIcons.length]
    )
  }
</script>

{#snippet supplierCell(row: any)}
  {#if row}
    <div class="flex flex-col">
      <p class="text-foreground font-medium">{row.supplier}</p>
      {#if row.supplierEmail}
        <p class="text-foreground-default-secondary">{row.supplierEmail}</p>
      {/if}
    </div>
  {/if}
{/snippet}

{#snippet stepsCell(row: any)}
  {#if row}
    <StepIconList icons={generateSteps(parseInt(row.invoice.split('-')[2]))} />
  {/if}
{/snippet}

<DataTable
  {...props}
  columns={[
    ...props.columns.map((col) => {
      if (col.id === 'supplier') {
        return {
          ...col,
          cell: (value, row) => renderSnippet(supplierCell, row)
        }
      }
      return col
    }),
    {
      id: 'steps',
      header: 'Steps',
      cell: (value, row) => renderSnippet(stepsCell, row),
      enableSorting: false,
      enableResizing: true,
      size: 300,
      minSize: 200
    }
  ]}
/>
