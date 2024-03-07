<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Add, Settings } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'

  export let items: DrawerOption[] = []
  export let multiple = false

  const dispatch = createEventDispatcher()
</script>

<div class="w-[300px] border border-neutral-100 pt-1 rounded shadow-lg space-y-0.5 bg-white">
  <ul class="px-1 space-y-1 max-h-[60vh] overflow-y-auto">
    {#each items as item}
      <DrawerContextItem {item} {multiple} on:click />
    {/each}
  </ul>
  <ul class="px-1 space-y-1 bg-neutral-50 rounded-b border-t border-neutral-100 p-1 space-y-1">
    <li class="pl-1.5 py-2 pr-2">
      <button
        class="flex items-center space-x-2 w-full"
        on:click={() => {
          dispatch('click', 'add')
        }}
      >
        <Icon src={Add} class="w-5 h-5 text-neutral-500" />
        <span class="text-neutral-800 tracking-tight text-base font-medium">Create workspace</span>
      </button>
    </li>
    <li class="pl-1.5 py-2 pr-2">
      <button
        class="flex items-center space-x-2 w-full"
        on:click={() => {
          dispatch('click', 'settings')
        }}
      >
        <Icon src={Settings} class="w-5 h-5 text-neutral-500" />
        <span class="text-neutral-800 tracking-tight text-base font-medium">Settings</span>
      </button>
    </li>
  </ul>
</div>
