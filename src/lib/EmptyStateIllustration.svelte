<script lang="ts">
  import type { EmptyStateIcon } from './types.js'
  import BgPattern from './svg/BgPattern.svelte'
  import IconContact from './svg/IconContact.svelte'
  import IconInvoice from './svg/IconInvoice.svelte'
  import IconProduct from './svg/IconProduct.svelte'
  import IconFile from './svg/IconFile.svelte'
  import IconPdf from './svg/IconPdf.svelte'
  import IconNoResults from './svg/IconNoResults.svelte'
  import type { SvelteComponent } from 'svelte'

  export let icon: EmptyStateIcon | undefined = undefined
  export let title = ''
  export let description = ''

  $: iconComponent = getComponent(icon)

  function getComponent(icon: EmptyStateIcon | undefined) {
    if (!icon) return undefined

    const icons: Record<EmptyStateIcon, unknown> = {
      invoices: IconInvoice,
      contacts: IconContact,
      products: IconProduct,
      file: IconFile,
      pdf: IconPdf,
      'no-results': IconNoResults
    }

    return icons[icon] as typeof SvelteComponent
  }
</script>

<div
  class="flex flex-col text-center items-center justify-center h-full font-sans gap-1"
  aria-label={title}
>
  {#if iconComponent}
    <div class="relative h-[120px] w-full max-w-sm">
      <div class="absolute top-0 left-0">
        <BgPattern />
      </div>
      <svelte:component
        this={iconComponent}
        classes="text-neutral-400/40 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] -ml-[40px] rotate-[-8deg] mt-0.5 z-20 w-[86px] h-[104px]"
      />
      <svelte:component
        this={iconComponent}
        classes="{icon === 'no-results'
          ? 'text-neutral-400'
          : 'color-emptystate-accent'} absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] z-30 w-[97px] h-[117px]"
      />
      <svelte:component
        this={iconComponent}
        classes="text-neutral-400/40 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ml-[40px] rotate-[8deg] mt-0.5 z-20 w-[86px] h-[104px]"
      />
    </div>
  {/if}
  <div class="space-y-0.5">
    <h4 class="font-medium text-base text-neutral-800 text-base tracking-tight">{title}</h4>
    <p class="max-w-xs text-base text-neutral-500 tracking-normal">{description}</p>
    <p><slot /></p>
  </div>
</div>

<style>
  :global(.color-emptystate-accent) {
    color: var(--workspace-accent-color, #169958);
  }
</style>
