<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import InputRadio from './InputRadio.svelte'

  export let id
  export let title = ''
  export let description = ''
  export let checked = false
  export let icon: IconSource | undefined = undefined
</script>

<label
  for={id}
  class="{checked
    ? 'border-workspace-accent shadow-active'
    : 'border-neutral-200'} border rounded-lg w-full text-left cursor-pointer block"
>
  <div class="py-2 pr-2 pl-3 flex items-start justify-between">
    <div class="flex space-x-2">
      {#if icon}
        <Icon src={icon} class="h-5 w-5 mt-0.5 text-neutral-800 flex-shrink-0" />
      {/if}
      <div class="flex flex-col space-y-0.5">
        <span class="text-base text-neutral-800 font-medium">{title}</span>
        {#if description}
          <span class="text-sm text-neutral-500">{description}</span>
        {:else}
          <span class="text-sm text-neutral-300">No description</span>
        {/if}
      </div>
    </div>

    <InputRadio {id} {checked} on:change />
  </div>
  {#if !!$$slots.footer}
    <div class="bg-neutral-50 rounded-b-lg px-3 py-2.5 border-t border-neutral-100">
      <slot name="footer" />
    </div>
  {/if}
</label>
