<script lang="ts">
  import isEqual from 'lodash/isEqual.js'
  import type { AnyProp, DrawerOption, IconTheme } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher } from 'svelte'
  import { resolveIcon } from './helpers.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'

  const dispatch = createEventDispatcher()

  export let value: AnyProp = ''
  export let icon: IconSource | string | undefined = undefined
  export let iconTheme: IconTheme = 'default'
  export let options: DrawerOption[] = []
  export let placeholder = ''
  export let multiple = false

  let selectDropdown: BaseDropdown
  let resolvedIcon: IconSource | undefined

  $: {
    resolveIcon(icon).then((icon) => {
      resolvedIcon = icon
    })
  }

  $: items = options.map((o) => ({
    ...o,
    selected: multiple
      ? Boolean((value as DrawerOption[]).find((v) => v.value === o.value))
      : o.value === value
  }))

  $: selectedLabel = (!multiple && items.find((i) => i.selected)?.label) || placeholder

  function handleClick(e: CustomEvent) {
    value = e.detail

    dispatch('selected', value)

    if (multiple) return

    selectDropdown.toggle()
  }

  function handleSelected(e: CustomEvent) {
    if (!multiple) return

    // Avoid re-firing watcher
    if (isEqual(value, e.detail)) return

    value = e.detail
  }
</script>

<BaseDropdown placement="bottom-start" bind:this={selectDropdown}>
  <div
    class="dropdown-select flex items-center border hover:border-neutral-300 rounded py-1.25 pl-2"
    slot="trigger"
  >
    {#if resolvedIcon}
      <Icon src={resolvedIcon} {iconTheme} class="h-4 w-4 text-neutral-500 mr-1" />
    {/if}
    <span class="w-full pr-8 text-neutral-800 placeholder-neutral-800 text-base"
      >{selectedLabel}</span
    >
  </div>
  <DrawerContext {multiple} {items} on:click={handleClick} on:selected={handleSelected} />
</BaseDropdown>

<style>
  .dropdown-select {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0iI0YzRjVGNSIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwQTBBMEEiIHN0cm9rZS13aWR0aD0iMS4yIi8+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }
</style>
