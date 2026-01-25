<script lang="ts">
  import isEqual from 'lodash-es/isEqual'
  import type { AnyProp, DrawerOption, DropdownSelectProps } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import clsx from 'clsx'
  import TagStatus from './TagStatus.svelte'
  import { resolveIcon } from './helpers.js'
  import { buttonVariants } from './button/button.svelte'

  let {
    value = $bindable(''),
    icon = undefined,
    iconTheme = 'default',
    options = [],
    placeholder = '',
    multiple = false,
    fullWidth = false,
    widthClass = 'min-w-[160px] max-w-[420px]',
    onSelect,
    stackLeft = false,
    stackRight = false,
    multipleLabel = 'items'
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
  let selectedColors = $derived(
    multiple ? selectedItems.filter((i) => i.color).map((i) => i.color) : []
  )
  let hasMultipleColors = $derived(multiple && selectedColors.length > 0)
  let selectedIcon = $derived(!multiple && items.find((i) => i.selected)?.icon)
  let selectedIconColor = $derived(
    (!multiple && items.find((i) => i.selected)?.iconClass) || 'text-foreground-default-secondary'
  )
  let selectedLabel = $derived(
    hasMultipleColors && selectedItems.length > 1
      ? `${selectedItems.length} ${multipleLabel}`
      : `${selectedItems[0]?.label || ''}${selectedItems.length > 1 && multiple ? ' and more' : ''}` ||
          placeholder
  )

  let isStacked = $derived(stackLeft || stackRight)

  let styles = $derived(
    isStacked
      ? buttonVariants({
          variant: 'ghost',
          stackedLeft: stackLeft,
          stackedRight: stackRight
        })
      : clsx('border backdrop-blur-sm backdrop-filter dropdown-select', {
          'border-border-selected-bold shadow-active': isOpen,
          'border-border-default-secondary hover:border-border-default-secondary-hover': !isOpen
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
    onSelect?.(value)
  }
</script>

{#snippet label()}
  <span
    class="flex-1 text-base truncate {selectedItems.length
      ? 'text-foreground'
      : 'text-foreground-default-secondary'}"
  >
    {selectedLabel}
  </span>
{/snippet}

<BaseDropdown
  bind:isOpen
  placement="bottom-start"
  {fullWidth}
  bind:this={selectDropdown}
  class={fullWidth || isStacked ? '' : widthClass}
>
  {#snippet trigger()}
    <div
      class="{styles} flex items-center rounded-lg py-1.5 pl-2 bg-background overflow-hidden w-full h-7"
      class:pr-[28px]={!isStacked}
      class:pr-2={isStacked}
    >
      {#if hasMultipleColors}
        <div class="flex items-center gap-1 flex-1 min-w-0">
          <div class="flex items-center -space-x-0.5">
            {#each selectedColors.slice(0, 3) as color}
              <span class="border-l border-background rounded-xs flex first:border-l-0">
                <TagStatus dot status={color} />
              </span>
            {/each}
          </div>
          {@render label()}
        </div>
      {:else if selectedColor}
        <div class="flex items-center gap-1 flex-1 min-w-0">
          <TagStatus dot status={selectedColor} />
          {@render label()}
        </div>
      {:else if selectedIcon || resolvedIcon}
        <div class="flex items-center gap-1 flex-1 min-w-0">
          {#if selectedIcon}
            <Icon src={selectedIcon} {iconTheme} class="{selectedIconColor} size-4 flex-shrink-0" />
          {:else if resolvedIcon}
            <Icon src={resolvedIcon} {iconTheme} class="text-icon size-4 flex-shrink-0" />
          {/if}
          {@render label()}
        </div>
      {:else}
        {@render label()}
      {/if}
    </div>
  {/snippet}
  <DrawerContext
    widthClass="min-w-[256px]"
    {multiple}
    {items}
    onclick={handleClick}
    onselect={handleSelected}
  />
</BaseDropdown>

<style>
  .dropdown-select {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iNCIgZmlsbD0icmdiYSg1LCA1LCAzNiwgMC4wNikiLz4KPHBhdGggZD0iTTQuNSA2LjVMOCAxMEwxMS41IDYuNSIgc3Ryb2tlPSIjMGIwYjEwIiBzdHJva2Utd2lkdGg9IjEuMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==');
    background-repeat: no-repeat;
    background-position: center right 8px;
  }
</style>
