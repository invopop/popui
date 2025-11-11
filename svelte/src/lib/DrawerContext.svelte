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

<div
  class="{widthClass} border border-border rounded-2xl shadow-lg bg-white overflow-hidden flex flex-col"
>
  {@render children?.()}

  {#if hasGroups}
    {#each groups as group, index}
      {@const groupItems = groupedItems.get(group.slug) || []}
      {@const isLastGroup = index === groups!.length - 1}
      <div class="flex-shrink-0 {!isLastGroup ? 'border-b border-border' : ''}">
        <button
          class="cursor-pointer flex items-center justify-between h-9 pl-3 pr-2.5 py-2.5 text-sm font-medium text-foreground-default-secondary w-full hover:bg-background-default-secondary rounded-lg overflow-clip"
          onclick={() => toggleGroup(group.slug)}
        >
          <div class="flex items-center gap-1.5">
            <span>{group.label}</span>
            <Icon
              src={ChevronRight}
              class="size-3 text-icon-default-secondary transition-all transform {openGroups[
                group.slug
              ]
                ? 'rotate-90'
                : ''}"
            />
          </div>
          {#if groupItems.length}
            <BaseCounter value={groupItems.length} />
          {/if}
        </button>

        {#if openGroups[group.slug]}
          <div transition:slide class="w-full">
            {#if !groupItems.length}
              <div class="px-1 pt-1 pb-5">
                <EmptyState
                  iconSource={group.emptyIcon}
                  title={group.emptyTitle || 'No items here'}
                  description={group.emptyDescription || 'Add items to get started'}
                />
              </div>
            {:else}
              <div class="max-h-[400px] overflow-y-auto">
                {#each groupItems as item}
                  {#if item.separator}
                    <DrawerContextSeparator />
                  {:else}
                    <div class="px-1">
                      <DrawerContextItem {item} {multiple} {onclick} onchange={updateItem} />
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  {/if}

  {#if ungroupedItems.length}
    <div class="flex-shrink-0 max-h-[400px] overflow-y-auto">
      {#each ungroupedItems as item}
        {#if item.separator}
          <DrawerContextSeparator />
        {:else}
          <div class="px-1">
            <DrawerContextItem {item} {multiple} {onclick} onchange={updateItem} />
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>
