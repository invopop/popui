<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { ChevronRight, Collapse, Invoice, Note, Payment } from '@invopop/ui-icons'
  import BaseButton from '$lib/BaseButton.svelte'
  import CardDeck from '$lib/CardDeck.svelte'
  import TagStatus from '$lib/TagStatus.svelte'
  import type { StatusType } from '$lib/types.js'

  type Reference = {
    id: string
    date: string
    amount: string
    status?: { label: string; color: StatusType }
  }

  const accepted = { label: 'Accepted', color: 'green' as const }
  const paid = { label: 'Paid', color: 'green' as const }
  const rejected = { label: 'Rejected', color: 'crimson' as const }

  const invoices: Reference[] = [
    { id: 'REL-0100', date: 'Oct 5', amount: '1,210.00', status: accepted },
    { id: 'REL-0099', date: 'Oct 1', amount: '1,089.00' },
    { id: 'REL-0098', date: 'Sep 30', amount: '2,420.00', status: paid },
    { id: 'REL-0097', date: 'Sep 28', amount: '605.00', status: paid },
    { id: 'REL-0096', date: 'Sep 22', amount: '1,210.00', status: paid },
    { id: 'REL-0095', date: 'Sep 18', amount: '880.00', status: paid },
    { id: 'REL-0094', date: 'Sep 12', amount: '1,210.00', status: paid },
    { id: 'REL-0093', date: 'Sep 3', amount: '342.50', status: paid }
  ]

  const notes: Reference[] = [
    { id: 'REL-CN-0002', date: 'Oct 10', amount: '-60.50', status: rejected },
    { id: 'REL-CN-0001', date: 'Oct 8', amount: '-242.00', status: accepted },
    { id: 'REL-DN-0001', date: 'Oct 12', amount: '+181.50' }
  ]

  const payments: Reference[] = [
    { id: 'PAY-0002', date: 'Oct 20', amount: '649.50' },
    { id: 'PAY-0001', date: 'Oct 15', amount: '500.00' },
    { id: 'PAY-0998', date: 'Oct 9', amount: '1,210.00' },
    { id: 'PAY-0997', date: 'Oct 2', amount: '320.00' },
    { id: 'PAY-0996', date: 'Sep 25', amount: '1,089.00' },
    { id: 'PAY-0995', date: 'Sep 19', amount: '2,420.00' },
    { id: 'PAY-0994', date: 'Sep 11', amount: '605.00' },
    { id: 'PAY-0993', date: 'Sep 4', amount: '1,210.00' }
  ]

  // Five and a half rows: the cut-off card is the cue that the list scrolls.
  const maxHeight = '12.5rem'
  const deckClass = '[&_[data-card-deck-card]]:py-2'
</script>

<div class="flex flex-col gap-3">
  <CardDeck
    label="Invoices (1284)"
    items={invoices}
    href={(item) => `#${item.id}`}
    {maxHeight}
    action={collapse}
    class={deckClass}
  >
    {#snippet card(item)}
      {@render row(item, Invoice)}
    {/snippet}
  </CardDeck>

  <CardDeck
    label="Credit and debit notes (3)"
    items={notes}
    href={(item) => `#${item.id}`}
    action={collapse}
    class={deckClass}
  >
    {#snippet card(item)}
      {@render row(item, Note)}
    {/snippet}
  </CardDeck>

  <CardDeck
    label="Payments (612)"
    items={payments}
    href={(item) => `#${item.id}`}
    {maxHeight}
    action={collapse}
    class={deckClass}
  >
    {#snippet card(item)}
      {@render row(item, Payment)}
    {/snippet}
  </CardDeck>
</div>

{#snippet collapse()}
  <BaseButton variant="ghost" size="sm" aria-label="Collapse" icon={Collapse} />
{/snippet}

{#snippet row(item: Reference, icon: IconSource)}
  <Icon src={icon} class="size-4 shrink-0 text-icon" />
  <span class="text-sm font-medium text-foreground">{item.id}</span>
  <span class="text-sm text-foreground-default-secondary">{item.date}</span>
  <div class="flex grow items-center justify-end gap-2">
    {#if item.status}
      <TagStatus label={item.status.label} status={item.status.color} dot />
    {/if}
    <span class="font-mono text-sm text-foreground tabular-nums">{item.amount}</span>
  </div>
  <Icon src={ChevronRight} class="size-4 shrink-0 text-icon-default-secondary" />
{/snippet}
