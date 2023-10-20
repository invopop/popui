<script lang="ts">
  import type { SelectOption } from '$lib/types.ts'
  import InputCheckbox from '$lib/InputCheckbox.svelte'
  import InputSearch from './InputSearch.svelte'

  export let items: SelectOption[] = []
  export let multiple = false
  export let searchable = false
</script>

<div class="w-60 border border-neutral-100 rounded-2xl p-1 shadow-lg space-y-0.5">
  {#if searchable}
    <div class="px-2 mt-2 mb-1"><InputSearch placeholder="Search" /></div>
  {/if}
  <ul>
    {#each items as item}
      <li
        class="px-2 py-1.5 hover:bg-neutral-50 rounded-xl flex items-center justify-between space-x-2"
      >
        <span class="text-neutral-800 text-sm font-medium">{item.label}</span>
        {#if multiple}
          <InputCheckbox />
        {/if}
      </li>
    {/each}
  </ul>
</div>
