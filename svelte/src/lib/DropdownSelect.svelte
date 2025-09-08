<script lang="ts">
  import isEqual from 'lodash-es/isEqual'
  import type { AnyProp, DrawerOption, DropdownSelectProps, IconTheme } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import clsx from 'clsx'
  import TagStatus from './TagStatus.svelte'
  import { resolveIcon } from './helpers.js'

  let {
    value = $bindable(''),
    icon = undefined,
    iconTheme = 'default',
    options = [],
    placeholder = '',
    multiple = false,
    fullWidth = false,
    widthClass = 'min-w-[160px] max-w-[420px]',
    onSelect
  }: DropdownSelectProps = $props()

  let selectDropdown: BaseDropdown | undefined = $state()
  let resolvedIcon: IconSource | undefined = $state()
  let isOpen = $state(false)

  $effect(() => {
    resolveIcon(icon).then((res) => (resolvedIcon = res))
  })

  let items = $derived(
    options.map((o) => ({
      ...o,
      selected: multiple
        ? Boolean((value as DrawerOption[]).find((v) => v.value === o.value))
        : o.value === value
    }))
  )

  let selectedItems = $derived(items.filter((i) => i.selected))
  let selectedColor = $derived(!multiple && items.find((i) => i.selected)?.color)
  let selectedIcon = $derived(!multiple && items.find((i) => i.selected)?.icon)
  let selectedIconColor = $derived(
    (!multiple && items.find((i) => i.selected)?.iconClass) || 'text-neutral-500'
  )
  let selectedLabel = $derived(
    `${selectedItems[0]?.label || ''}${selectedItems.length > 1 ? ' and more...' : ''}` ||
      placeholder
  )

  let styles = $derived(
    clsx({
      'shadow-active border-workspace-accent hover:border-workspace-accent': isOpen
    })
  )

  function handleClick(val: AnyProp) {
    value = val

    onSelect?.(value)

    if (multiple) return

    selectDropdown?.toggle()
  }

  function handleSelected(val: AnyProp) {
    if (!multiple) return

    // Avoid re-firing watcher
    if (isEqual(value, val)) return

    value = val
  }
</script>

<BaseDropdown bind:isOpen placement="bottom-start" {fullWidth} bind:this={selectDropdown}>
  {#snippet trigger()}
    <div
      class="{styles} dropdown-select max-w-[420px] flex items-center border hover:border-neutral-300 rounded-md py-1.25 pl-2 gap-1 bg-white whitespace-nowrap"
    >
      {#if selectedColor}
        <TagStatus dot status={selectedColor} />
      {:else if selectedIcon}
        <Icon src={selectedIcon} {iconTheme} class="{selectedIconColor} h-4 w-4 flex-shrink-0" />
      {:else if resolvedIcon}
        <Icon src={resolvedIcon} {iconTheme} class="h-4 w-4 text-neutral-500 flex-shrink-0" />
      {/if}

      <span class="w-full pr-8 text-neutral-800 placeholder-neutral-800 text-base truncate">
        {selectedLabel}
      </span>
    </div>
  {/snippet}
  <DrawerContext {widthClass} {multiple} {items} onclick={handleClick} onselect={handleSelected} />
</BaseDropdown>

<style>
  .dropdown-select {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0iI0YzRjRGNiIvPgo8cGF0aCBkPSJNNi41IDguMjUwMDRMMTAgMTEuNzVMMTMuNSA4LjI1IiBzdHJva2U9IiMwMzA3MTIiIHN0cm9rZS13aWR0aD0iMS4xIi8+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }
</style>
