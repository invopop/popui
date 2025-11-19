<script lang="ts">
  import type { DrawerContextProps, DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import DrawerContextSeparator from './DrawerContextSeparator.svelte'
  import EmptyState from './EmptyState.svelte'
  import BaseCounter from './BaseCounter.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronRight } from '@steeze-ui/heroicons'
  import { slide } from 'svelte/transition'

  let {
    items = $bindable([]),
    multiple = false,
    widthClass = 'w-60',
    onclick,
    onselect,
    children,
    groups
  }: DrawerContextProps = $props()

  let selectedItems = $derived(items.filter((i) => i.selected))
  let hasGroups = $derived(groups && groups.length > 0)
  let { groupedItems, ungroupedItems } = $derived.by(() => {
    if (!hasGroups) return { groupedItems: new Map(), ungroupedItems: items }

    const grouped = new Map<string, DrawerOption[]>()
    const ungrouped: DrawerOption[] = []

    groups!.forEach((group) => {
      grouped.set(group.slug, [])
    })

    items.forEach((item) => {
      if (item.groupBy && grouped.has(item.groupBy)) {
        grouped.get(item.groupBy)!.push(item)
      } else {
        ungrouped.push(item)
      }
    })

    return { groupedItems: grouped, ungroupedItems: ungrouped }
  })

  let openGroups = $state<Record<string, boolean>>({})

  $effect(() => {
    if (hasGroups) {
      const selectedItem = items.find((i) => i.selected)
      if (selectedItem?.groupBy && Object.keys(openGroups).length === 0) {
        openGroups = { [selectedItem.groupBy]: true }
      }
    }
  })

  $effect(() => {
    onselect?.(selectedItems)
  })

  function updateItem(item: DrawerOption) {
    items = items.map((i) => {
      if (i.value === item.value) return item
      return i
    })
  }

  function toggleGroup(groupSlug: string) {
    openGroups = openGroups[groupSlug] ? {} : { [groupSlug]: true }
  }
</script>

{#snippet drawerItem(item: DrawerOption)}
  {#if item.separator}
    <DrawerContextSeparator />
  {:else}
    <div class:px-1={!item.groupBy}>
      <DrawerContextItem {item} {multiple} {onclick} onchange={updateItem} />
    </div>
  {/if}
{/snippet}

<div
  class="{widthClass} border border-border rounded-2xl shadow-lg bg-background flex flex-col py-1 max-h-[440px] list-none"
>
  {@render children?.()}

  {#if hasGroups}
    {#each groups as group, index}
      {@const groupItems = groupedItems.get(group.slug) || []}
      {@const isLastGroup = index === groups!.length - 1}
      {@const isOpen = openGroups[group.slug]}
      {@const hasOpenGroup = Object.values(openGroups).some((v) => v)}
      <div
        class="px-1"
        class:flex-1={isOpen}
        class:flex={isOpen}
        class:flex-col={isOpen}
        class:min-h-0={isOpen}
        class:flex-shrink-0={!isOpen && hasOpenGroup}
      >
        <button
          class="cursor-pointer flex items-center justify-between h-8 pl-2.5 pr-2.5 py-2.5 text-base font-medium text-foreground-default-secondary w-full hover:bg-background-default-secondary rounded-lg overflow-clip flex-shrink-0"
          onclick={() => toggleGroup(group.slug)}
        >
          <div class="flex items-center gap-1.5">
            <span>{group.label}</span>
            <Icon
              src={ChevronRight}
              class="size-3 text-icon-default-secondary transition-all transform {isOpen
                ? 'rotate-90'
                : ''}"
            />
          </div>
          {#if groupItems.length}
            <BaseCounter value={groupItems.length} />
          {/if}
        </button>

        {#if isOpen}
          <div class="w-full overflow-y-auto flex-1 min-h-0" transition:slide={{ duration: 200 }}>
            {#if !groupItems.length}
              <div class="px-1 pt-1 pb-5">
                <EmptyState
                  iconSource={group.emptyIcon}
                  title={group.emptyTitle || 'No items here'}
                  description={group.emptyDescription || 'Add items to get started'}
                />
              </div>
            {:else}
              {#each groupItems as item}
                {@render drawerItem(item)}
              {/each}
            {/if}
          </div>
        {/if}
      </div>
      {#if !isLastGroup}
        <DrawerContextSeparator />
      {/if}
    {/each}
  {/if}

  {#if ungroupedItems.length}
    <div class="flex-shrink-0 overflow-y-auto max-h-[436px]">
      {#each ungroupedItems as item}
        {@render drawerItem(item)}
      {/each}
    </div>
  {/if}
</div>
