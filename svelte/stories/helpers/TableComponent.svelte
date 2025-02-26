<script lang="ts">
  import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../../lib/table'
  import BaseTableActions from '../../lib/BaseTableActions.svelte'
  import StepIconList from '../../lib/StepIconList.svelte'
  import type { TableAction } from '../../lib/types'
  import { Archive, Duplicate } from '@invopop/ui-icons'

  let data = [
    {
      name: 'Reissue invoice flow',
      description: 'Reissue the invoice once it’s fixed',
      type: 'Invoice',
      steps: [
        { name: 'Google Drive', url: 'https://gdrive.invopop.com/icon.svg' },
        { name: 'Update Chargebee', url: 'https://chargebee.invopop.com/icon.svg' }
      ]
    },
    {
      name: 'Full invoice flow',
      description: 'Send invoice to customer and supplier',
      type: 'Invoice',
      steps: [
        { name: 'Google Drive', url: 'https://gdrive.invopop.com/icon.svg' },
        { name: 'Update Chargebee', url: 'https://chargebee.invopop.com/icon.svg' },
        { name: 'Send CFDI to SAT (Mexico)', url: 'https://sat-mx.invopop.com/icon.png' }
      ]
    },
    {
      name: 'Simple invoice',
      description: 'Send invoice to customer only',
      type: 'Invoice',
      steps: [
        { name: 'Google Drive', url: 'https://gdrive.invopop.com/icon.svg' },
        { name: 'Update Chargebee', url: 'https://chargebee.invopop.com/icon.svg' },
        { name: 'Send CFDI to SAT (Mexico)', url: 'https://sat-mx.invopop.com/icon.png' },
        { name: 'Send email', url: 'https://email.invopop.com/icon.png' }
      ]
    }
  ]
  let actions: TableAction[] = [
    { icon: Duplicate, label: 'Copy JSON to clipboard', slug: 'duplicate' },
    { icon: Archive, label: 'Archive', destructive: true, slug: 'archive', footer: true }
  ]
</script>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Steps</TableHead>
      <TableHead>Type</TableHead>
      <TableHead class="w-[38px]" />
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each data as row, i (i)}
      <TableRow>
        <TableCell>
          <p class="text-neutral-800 font-medium">{row.name}</p>
          <p>{row.description}</p>
        </TableCell>
        <TableCell>
          <StepIconList icons={row.steps} />
        </TableCell>
        <TableCell>
          <span>{row.type}</span>
        </TableCell>
        <TableCell class="w-[38px] py-2.5 pl-1">
          <BaseTableActions {actions} />
        </TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
