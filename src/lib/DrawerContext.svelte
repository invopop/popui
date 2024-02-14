<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import InputSearch from './InputSearch.svelte'

  export let items: DrawerOption[] = []
  export let multiple = false
  export let searchable = false
  export let widthClass = 'w-60'

  $: mainItems = items.filter((i) => !i.footer)
  $: footerItems = items.filter((i) => i.footer)
</script>

<div class="{widthClass} border border-neutral-100 py-1 rounded shadow-lg space-y-0.5 bg-white">
  {#if searchable}
    <div class="px-2 mt-2 mb-1"><InputSearch placeholder="Search" /></div>
  {/if}
  <ul class="px-1 space-y-1">
    {#each mainItems as item}
      <DrawerContextItem {item} {multiple} on:click />
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
