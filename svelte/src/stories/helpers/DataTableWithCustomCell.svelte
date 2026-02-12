<script lang="ts">
  import DataTable from '../../lib/data-table/data-table.svelte'
  import { renderSnippet } from '../../lib/data-table/index.js'
  import Button from '../../lib/button/button.svelte'
  import StepIconList from '../../lib/StepIconList.svelte'
  import type { DataTableProps } from '../../lib/data-table/data-table-types.js'
  import type { StepIcon } from '../../lib/types.js'

  type Props<TData> = DataTableProps<TData>

  let props: Props<any> = $props()

  let isLoading = $state(false)

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
    return Array.from({ length: count }, (_, i) => mockStepIcons[i % mockStepIcons.length])
  }

  // Generate UUID for each row based on invoice number
  function generateUuid(invoiceNumber: string): string {
    const num = parseInt(invoiceNumber.split('-')[2])
    const segment1 = `${num.toString().padStart(8, '0')}`
    const segment2 = `${(num * 17).toString(16).padStart(4, '0').slice(0, 4)}`
    const segment3 = `${(num * 37).toString(16).padStart(4, '0').slice(0, 4)}`
    const segment4 = `${(num * 73).toString(16).padStart(4, '0').slice(0, 4)}`
    const segment5 = `${(num * 113).toString(16).padStart(12, '0').slice(0, 12)}`
    return `${segment1}-${segment2}-${segment3}-${segment4}-${segment5}`
  }

  // Augment data with UUID field
  const dataWithUuid = props.data.map((row: any) => ({
    ...row,
    id: generateUuid(row.invoice)
  }))
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

{#snippet paginationControls()}
  <Button
    variant="secondary"
    size="md"
    onclick={() => {
      isLoading = !isLoading
    }}
  >
    {isLoading ? 'Hide Loading' : 'Show Loading'}
  </Button>
{/snippet}

<DataTable
  {...props}
  data={dataWithUuid}
  loading={isLoading}
  initialFrozenColumns={['invoice', 'signed']}
  getRowClassName={() => 'h-[60px]'}
  paginationSlot={paginationControls}
  columns={[
    ...props.columns.map((col): any => {
      if (col.id === 'supplier') {
        return {
          ...col,
          cell: (_: string, row: any) => renderSnippet(supplierCell, row),
          loadingConfig: {
            lines: 2
          }
        }
      }
      return col
    }),
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      cellType: 'uuid',
      cellConfig: {
        prefixLength: 4,
        suffixLength: 4,
        onCopy: (value: string) => console.log('UUID copied:', value)
      },
      enableSorting: false,
      enableResizing: true,
      size: 180,
      minSize: 150
    },
    {
      id: 'steps',
      header: 'Steps',
      cell: (_: undefined, row: any) => renderSnippet(stepsCell, row),
      enableSorting: false,
      enableResizing: true,
      size: 300,
      minSize: 200
    }
  ]}
/>
