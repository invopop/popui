<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import InputSearch from './InputSearch.svelte'
  import { createEventDispatcher } from 'svelte'
  import DrawerContextSeparator from './DrawerContextSeparator.svelte'

  const dispatch = createEventDispatcher()

  export let items: DrawerOption[] = []
  export let multiple = false
  export let searchable = false
  export let widthClass = 'w-60'

  $: selectedItems = items.filter((i) => i.selected)
  $: dispatch('selected', selectedItems)

  function updateItem(event: CustomEvent) {
    const item = event.detail as DrawerOption
    items = items.map((i) => {
      if (i.value === item.value) return item
      return i
    })
  }
</script>

<div
  class="{widthClass} border border-neutral-200 py-1 rounded-md shadow-lg space-y-0.5 bg-white max-h-80 overflow-y-auto"
>
  {#if searchable}
    <div class="px-2 mt-2 mb-1">
      <InputSearch placeholder="Search" />
    </div>
  {/if}
  <ul class="px-1 space-y-1 max-h-80 overflow-y-auto">
    {#each items as item}
      {#if item.separator}
        <DrawerContextSeparator />
      {:else}
        <DrawerContextItem {item} {multiple} on:click on:change={updateItem} />
      {/if}
    {/each}
  </ul>
</div>
