<script lang="ts">
  import { createTabs } from 'svelte-headlessui'
  import type { TabItem } from './types.js'
  import BaseCounter from './BaseCounter.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Alert, Success } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let items: TabItem[] = []
  export let selected = ''

  const tabs = createTabs({ selected: items.find((i) => i.label === selected) || items[0] })
</script>

<div
  use:tabs.list
  class="inline-flex space-x-0.5 rounded-md border p-0.5 border-neutral-200 bg-neutral-100 w-full"
>
  {#each items as value}
    <button
      use:tabs.tab={{ value }}
      class:bg-white={selected === value.label}
      class="flex items-center space-x-1 justify-center w-full whitespace-nowrap text-neutral-800 text-base font-medium focus:outline-none focus:ring-0 py-0.5 px-3 rounded"
      on:click={() => {
        selected = value.label
        dispatch('selected', selected)
      }}
    >
      <span class="tracking-tighter">{value.label}</span>
      {#if value.counter}
        <BaseCounter
          content={value.counter}
          variant={selected === value.label ? 'light' : 'default'}
        />
      {/if}
      {#if value.check}
        <Icon src={Success} class="h-4 w-4" />
      {/if}
      {#if value.warning}
        <Icon src={Alert} class="h-4 w-4" />
      {/if}
    </button>
  {/each}
</div>
