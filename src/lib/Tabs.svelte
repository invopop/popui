<script lang="ts">
  import { createTabs } from 'svelte-headlessui'
  import type { TabItem } from './types.js'
  import BaseCounter from './BaseCounter.svelte'

  export let items: TabItem[] = []
  export let selected = ''

  const tabs = createTabs({ selected: items.find((i) => i.label === selected) || items[0] })
</script>

<div use:tabs.list class="inline-flex space-x-4">
  {#each items as value}
    <button
      use:tabs.tab={{ value }}
      class:text-neutral-800={selected === value.label}
      class:text-neutral-300={selected !== value.label}
      class="flex items-center space-x-1 justify-start w-full whitespace-nowrap text-xl font-semibold focus:outline-none focus:ring-0"
      on:click={() => {
        selected = value.label
      }}
    >
      <span>{value.label}</span>
      {#if value.counter}
        <BaseCounter content={value.counter} />
      {/if}
    </button>
  {/each}
</div>
