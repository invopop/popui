<script lang="ts">
  import type { DrawerContextProps, DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import DrawerContextSeparator from './DrawerContextSeparator.svelte'

  let {
    items = $bindable([]),
    multiple = false,
    widthClass = 'w-60',
    onclick,
    onselect,
    children
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
  class="{widthClass} border border-neutral-200 py-0.5 rounded-2xl shadow-lg space-y-0.5 bg-white max-h-80 overflow-y-auto"
>
  {@render children?.()}
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
