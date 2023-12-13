<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import InputCheckbox from './InputCheckbox.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher } from 'svelte'
  import { Tick } from '@invopop/ui-icons'

  const dispatch = createEventDispatcher()

  export let multiple = false
  export let item: DrawerOption
</script>

<button
  class:bg-accent-50={item.selected}
  class="hover:bg-neutral-50 rounded py-1.5 px-2 flex items-center justify-start space-x-2 w-full"
  on:click|stopPropagation={() => {
    dispatch('click', item.value)
  }}
>
  {#if item.icon}
    <Icon src={item.icon} class="w-5 h-5 text-neutral-500" />
  {/if}
  <span class="text-sm font-medium text-neutral-800 whitespace-nowrap flex-1 text-left"
    >{item.label}</span
  >
  {#if multiple}
    <InputCheckbox />
  {:else if item.selected}
    <Icon src={Tick} class="w-5 h-5 text-accent-500" />
  {/if}
</button>
