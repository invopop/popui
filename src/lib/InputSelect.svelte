<script lang="ts">
  import type { IconTheme, SelectOption } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import InputLabel from './InputLabel.svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  import { resolveIcon } from './helpers.js'
  import { dispatchWcEvent } from './wcdispatch.js'

  const dispatch = createEventDispatcher()

  export let id = ''
  export let name = ''
  export let label = ''
  export let disabled = false
  export let value = ''
  export let icon: IconSource | string | undefined = undefined
  export let iconTheme: IconTheme = 'default'
  export let options: SelectOption[] = []
  export let placeholder = 'Select one...'
  export let disablePlaceholder = true

  let resolvedIcon: IconSource | undefined

  function handleChange(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLSelectElement

    dispatch('change', target.value)

    dispatchWcEvent(target, 'change', target.value)
  }

  onMount(async () => {
    resolvedIcon = await resolveIcon(icon)
  })
</script>

{#if label}
  <InputLabel {id} {label} />
{/if}
<div class="relative">
  <select
    {id}
    {name}
    bind:value
    {disabled}
    class:pl-7={icon}
    class:pl-3={!icon}
    class="py-1.25 border border-neutral-200 hover:border-neutral-300 w-full rounded text-neutral-800 text-base pr-9 outline-accent-400"
    on:change={handleChange}
  >
    <option value="" disabled={disablePlaceholder}>{placeholder}</option>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if resolvedIcon}
    <Icon src={resolvedIcon} theme={iconTheme} class="h-4 w-4 absolute top-2 left-2 mt-0.5" />
  {/if}
</div>

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
