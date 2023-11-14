<script lang="ts">
  import { createTabs } from 'svelte-headlessui'

  export let items: string[] = []
  export let selected = ''

  const tabs = createTabs({ selected: selected || items[0] })
</script>

<div use:tabs.list class="flex space-x-1 rounded-sm bg-neutral-100 p-0.5">
  {#each items as value}
    <button
      use:tabs.tab={{ value }}
      class:bg-white={$tabs.active === value}
      class:shadow={$tabs.active === value}
      class="w-full text-neutral-800 rounded py-1.25 px-3 text-sm font-medium focus:outline-none focus:ring-0"
      >{value}</button
    >
  {/each}
</div>
