<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import InputSearch from './InputSearch.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let items: DrawerOption[] = []
  export let multiple = false
  export let searchable = false
  export let widthClass = 'w-60'

  $: mainItems = items.filter((i) => !i.footer)
  $: footerItems = items.filter((i) => i.footer)
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

<div class="{widthClass} border border-neutral-200 py-1 rounded shadow-lg space-y-0.5 bg-white">
  {#if searchable}
    <div class="px-2 mt-2 mb-1">
      <InputSearch placeholder="Search" />
    </div>
  {/if}
  <ul class="px-1 space-y-1">
    {#each mainItems as item}
      <DrawerContextItem {item} {multiple} on:click on:change={updateItem} />
    {/each}
  </ul>
  {#if footerItems.length}
    <hr class="!my-1 border-neutral-100" />
    <ul class="px-1 space-y-1">
      {#each footerItems as item}
        <DrawerContextItem {item} {multiple} on:click />
      {/each}
    </ul>
  {/if}
</div>
