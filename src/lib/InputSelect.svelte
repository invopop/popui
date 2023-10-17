<script lang="ts">
  import type { SelectOption } from '$lib/types.ts'

  export let id = ''
  export let name = ''
  export let label = ''
  export let disabled = false
  export let value = ''
  export let options: SelectOption[] = []
  export let placeholder = 'Select one...'
  export let disablePlaceholder = true
</script>

{#if label}
  <label for={id} class="text-sm font-medium text-neutral-500 mb-2">{label}</label>
{/if}
<select
  {id}
  {name}
  bind:value
  {disabled}
  class="py-1.25 pl-3 border border-neutral-200 hover:border-neutral-300 w-full rounded-xl text-neutral-800 text-base pr-9 outline-accent-400"
>
  <option value="" disabled={disablePlaceholder}>{placeholder}</option>
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>

<style>
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0YzRjVGNSIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwQTBBMEEiIHN0cm9rZS13aWR0aD0iMS4yIi8+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-position: center right 12px;
  }
</style>
