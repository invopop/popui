<script lang="ts">
  import { Add, Options } from '@invopop/ui-icons'
  import BaseButton from '$lib/BaseButton.svelte'
  import CardDeck from '$lib/CardDeck.svelte'
  import TagStatus from '$lib/TagStatus.svelte'
  import type { CardDeckProps } from '$lib/types.js'

  type PaymentMethod = {
    id: string
    logo: string
    brand: string
    digits: string
    expiry: string
    isDefault?: boolean
  }

  interface Props extends Omit<CardDeckProps<PaymentMethod>, 'card' | 'items'> {
    withAction?: boolean
  }

  let { withAction = false, ...rest }: Props = $props()

  const items: PaymentMethod[] = [
    {
      id: 'visa',
      logo: 'https://assets.invopop.com/payment-methods/visa.svg',
      brand: 'Visa',
      digits: '· 3709',
      expiry: 'Exp 03/29',
      isDefault: true
    },
    {
      id: 'mastercard',
      logo: 'https://assets.invopop.com/payment-methods/mastercard.svg',
      brand: 'Mastercard',
      digits: '· 8374',
      expiry: 'Exp 11/32'
    },
    {
      id: 'amex',
      logo: 'https://assets.invopop.com/payment-methods/amex.svg',
      brand: 'Amex',
      digits: '· 1041',
      expiry: 'Exp 07/28'
    }
  ]
</script>

<CardDeck {...rest} {items} action={withAction ? addAction : undefined}>
  {#snippet card(method)}
    <!-- The Default tag sits with the digits rather than beside the expiry, so
         every card's expiry lands in the same column. -->
    <div class="flex grow items-center gap-2">
      <img src={method.logo} alt={method.brand} class="h-4 w-6 object-contain" />
      <span class="text-base font-medium text-foreground">{method.digits}</span>
      {#if method.isDefault}
        <TagStatus label="Default" status="grey" />
      {/if}
    </div>
    <div class="flex items-center gap-3">
      <span class="text-base text-foreground-default-secondary lining-nums tabular-nums">
        {method.expiry}
      </span>
      <BaseButton variant="ghost" size="sm" aria-label="Card actions" icon={Options} />
    </div>
  {/snippet}
</CardDeck>

{#snippet addAction()}
  <BaseButton size="sm" icon={Add}>Add</BaseButton>
{/snippet}
