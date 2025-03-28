<script lang="ts">
  import clsx from 'clsx'
  import InputRadio from './InputRadio.svelte'

  export let id
  export let title = ''
  export let description = ''
  export let checked = false

  $: styles = clsx(
    { 'border-workspace-accent shadow-active': checked },
    { 'border-neutral-200 hover:bg-neutral-100': !checked }
  )
</script>

<label for={id} class="{styles} border rounded-lg w-full text-left cursor-pointer block">
  <div class="py-2 pr-2 pl-3 flex items-start justify-between">
    <div class="flex flex-col space-y-0.5">
      <span class="text-base text-neutral-800 font-medium">{title}</span>
      {#if description}
        <span class="text-sm text-neutral-500">{description}</span>
      {:else}
        <span class="text-sm text-neutral-300">No description</span>
      {/if}
    </div>
    <InputRadio {id} {checked} on:change />
  </div>
  {#if !!$$slots.footer}
    <div class="bg-neutral-50 rounded-b-lg px-3 py-2.5 border-t border-neutral-100">
      <slot name="footer" />
    </div>
  {/if}
</label>
