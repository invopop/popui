<script lang="ts">
  import isEqual from 'lodash/isEqual.js'
  import type { AnyProp, DrawerOption, IconTheme } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher } from 'svelte'
  import { resolveIcon } from './helpers.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import clsx from 'clsx'
  import TagStatus from './TagStatus.svelte'

  const dispatch = createEventDispatcher()

  export let value: AnyProp = ''
  export let icon: IconSource | string | undefined = undefined
  export let iconTheme: IconTheme = 'default'
  export let options: DrawerOption[] = []
  export let placeholder = ''
  export let multiple = false
  export let fullWidth = false
  export let widthClass = 'min-w-[160px] max-w-[420px]'

  let selectDropdown: BaseDropdown
  let resolvedIcon: IconSource | undefined
  let isOpen = false

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

  $: selectedItems = items.filter((i) => i.selected)
  $: selectedColor = !multiple && items.find((i) => i.selected)?.color
  $: selectedIcon = !multiple && items.find((i) => i.selected)?.icon
  $: selectedLabel =
    `${selectedItems[0]?.label || ''}${selectedItems.length > 1 ? ' and more...' : ''}` ||
    placeholder

  $: styles = clsx({
    'shadow-active border-workspace-accent hover:border-workspace-accent': isOpen
  })

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

<BaseDropdown bind:isOpen placement="bottom-start" {fullWidth} bind:this={selectDropdown}>
  <div
    class="{styles} dropdown-select max-w-[420px] flex items-center border hover:border-neutral-300 rounded-md py-1.25 pl-2 gap-1 bg-white whitespace-nowrap"
    slot="trigger"
  >
    {#if selectedColor}
      <TagStatus dot status={selectedColor} />
    {:else if selectedIcon}
      <Icon src={selectedIcon} {iconTheme} class="h-4 w-4 text-neutral-500 flex-shrink-0" />
    {:else if resolvedIcon}
      <Icon src={resolvedIcon} {iconTheme} class="h-4 w-4 text-neutral-500 flex-shrink-0" />
    {/if}

    <span class="w-full pr-8 text-neutral-800 placeholder-neutral-800 text-base truncate">
      {selectedLabel}
    </span>
  </div>
  <DrawerContext
    {widthClass}
    {multiple}
    {items}
    on:click={handleClick}
    on:selected={handleSelected}
  />
</BaseDropdown>

<style>
  .dropdown-select {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwMzA3MTIiIHN0cm9rZS13aWR0aD0iMS4xIi8+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }
</style>
