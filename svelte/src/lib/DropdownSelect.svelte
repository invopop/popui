<script lang="ts">
  import isEqual from 'lodash-es/isEqual'
  import type { AnyProp, DrawerOption, DropdownSelectProps } from './types.ts'
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
    clsx('border backdrop-blur-sm backdrop-filter', {
      'border-border-selected-bold shadow-active': isOpen,
      'border-border hover:border-border-default-secondary-hover': !isOpen
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
      class="{styles} dropdown-select flex items-center rounded-lg py-1.5 px-2 bg-background whitespace-nowrap {fullWidth
        ? 'w-full'
        : widthClass}"
    >
      {#if selectedColor}
        <div class="flex items-center gap-1 flex-1 min-w-0">
          <TagStatus dot status={selectedColor} />
          <span
            class="flex-1 text-sm truncate {selectedItems.length
              ? 'text-foreground'
              : 'text-foreground-default-secondary'}"
          >
            {selectedLabel}
          </span>
        </div>
      {:else if selectedIcon || resolvedIcon}
        <div class="flex items-center gap-1 flex-1 min-w-0">
          {#if selectedIcon}
            <Icon src={selectedIcon} {iconTheme} class="{selectedIconColor} size-4 flex-shrink-0" />
          {:else if resolvedIcon}
            <Icon src={resolvedIcon} {iconTheme} class="text-icon size-4 flex-shrink-0" />
          {/if}
          <span
            class="flex-1 text-sm truncate {selectedItems.length
              ? 'text-foreground'
              : 'text-foreground-default-secondary'}"
          >
            {selectedLabel}
          </span>
        </div>
      {:else}
        <span
          class="flex-1 text-sm truncate {selectedItems.length
            ? 'text-foreground'
            : 'text-foreground-default-secondary'}"
        >
          {selectedLabel}
        </span>
      {/if}
    </div>
  {/snippet}
  <DrawerContext {widthClass} {multiple} {items} onclick={handleClick} onselect={handleSelected} />
</BaseDropdown>

<style>
  .dropdown-select {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0icmdiYSg1LCA1LCAzNiwgMC4wNikiLz4KPHBhdGggZD0iTTQuNSA2LjVMOCAxMEwxMS41IDYuNSIgc3Ryb2tlPSIjMGIwYjEwIiBzdHJva2Utd2lkdGg9IjEuMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }
</style>
