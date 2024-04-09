<script lang="ts">
  import type { IconTheme, SelectOption } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import InputLabel from './InputLabel.svelte'
  import { createEventDispatcher } from 'svelte'
  import { resolveIcon } from './helpers.js'
  import { dispatchWcEvent } from './wcdispatch.js'
  import InputError from './InputError.svelte'

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
  export let errorText = ''

  let resolvedIcon: IconSource | undefined

  $: {
    resolveIcon(icon).then((icon) => {
      resolvedIcon = icon
    })
  }

  function handleChange(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLSelectElement

    dispatch('change', target.value)

    dispatchWcEvent(target, 'change', target.value)
  }
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
    class:pl-2={!icon}
    class="py-1.5 border border-neutral-200 hover:border-neutral-300 focus:border-accent-500 w-full rounded-md text-neutral-800 text-base pr-9 outline-none tracking-tight ui-select"
    on:change={handleChange}
  >
    <option value="" disabled={disablePlaceholder}>{placeholder}</option>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if resolvedIcon}
    <Icon
      src={resolvedIcon}
      theme={iconTheme}
      class="h-4 w-4 absolute top-2 left-2 text-neutral-500"
    />
  {/if}
</div>

{#if errorText}
  <InputError {errorText} />
{/if}

<style>
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwMzA3MTIiIHN0cm9rZS13aWR0aD0iMS4xIi8+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }

  .ui-select:focus {
    box-shadow: 0px 0px 0px 2px rgba(22, 153, 88, 0.12);
  }
</style>
