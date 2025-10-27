<script lang="ts">
  import type { DrawerContextProps, DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import InputSearch from './InputSearch.svelte'
  import DrawerContextSeparator from './DrawerContextSeparator.svelte'

  let {
    items = $bindable([]),
    multiple = false,
    searchable = false,
    widthClass = 'w-60',
    onclick,
    onselect
  }: DrawerContextProps = $props()

  let selectedItems = $derived(items.filter((i) => i.selected))
  $effect(() => {
    onselect?.(selectedItems)
  })

  function updateItem(item: DrawerOption) {
    items = items.map((i) => {
      if (i.value === item.value) return item
      return i
    })
  }
</script>

<div
  class="{widthClass} border border-neutral-200 py-0.5 rounded-md shadow-lg space-y-0.5 bg-white max-h-80 overflow-y-auto"
>
  {#if searchable}
    <div class="px-2 mt-2 mb-1">
      <InputSearch placeholder="Search" />
    </div>
  {/if}
  <ul class="space-y-0.5 max-h-80 overflow-y-auto">
    {#each items as item}
      {#if item.separator}
        <DrawerContextSeparator />
      {:else}
        <DrawerContextItem {item} {multiple} {onclick} onchange={updateItem} />
      {/if}
    {/each}
  </ul>
</div>
