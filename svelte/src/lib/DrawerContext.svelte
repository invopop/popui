<script lang="ts">
  import type { DrawerContextProps, DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import DrawerContextSeparator from './DrawerContextSeparator.svelte'
  import EmptyState from './EmptyState.svelte'
  import BaseCounter from './BaseCounter.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronRight } from '@steeze-ui/heroicons'
  import { slide } from 'svelte/transition'
  import Sortable from 'sortablejs'
  import { onMount } from 'svelte'

  let {
    items = $bindable([]),
    multiple = false,
    draggable = false,
    widthClass = 'w-60',
    onclick,
    onselect,
    onreorder,
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
  let ungroupedContainer: HTMLElement | null = $state(null)
  let groupContainers: Record<string, HTMLElement | null> = {}

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

  function initializeSortable() {
    if (!draggable) return

    // Initialize sortable for ungrouped items
    if (ungroupedContainer && ungroupedItems.length > 0) {
      Sortable.create(ungroupedContainer, {
        animation: 150,
        handle: '.draggable-item',
        ghostClass: 'opacity-10',
        dragClass: 'cursor-grabbing',
        forceFallback: true,
        onEnd: (event) => {
          if (event.oldIndex !== undefined && event.newIndex !== undefined) {
            const newItems = [...items]
            const ungroupedIndices = items
              .map((item, index) => (!item.groupBy ? index : -1))
              .filter((i) => i !== -1)

            const fromIndex = ungroupedIndices[event.oldIndex]
            const toIndex = ungroupedIndices[event.newIndex]

            const [removed] = newItems.splice(fromIndex, 1)
            newItems.splice(toIndex, 0, removed)

            items = newItems
            onreorder?.(newItems)
          }
        }
      })
    }

    // Initialize sortable for grouped items
    if (hasGroups && groups) {
      groups.forEach((group) => {
        const container = groupContainers[group.slug]
        const groupItems = groupedItems.get(group.slug) || []

        if (container && groupItems.length > 0) {
          Sortable.create(container, {
            animation: 150,
            handle: '.draggable-item',
            ghostClass: 'opacity-10',
            dragClass: 'cursor-grabbing',
            forceFallback: true,
            onEnd: (event) => {
              if (event.oldIndex !== undefined && event.newIndex !== undefined) {
                const newItems = [...items]
                const groupedIndices = items
                  .map((item, index) => (item.groupBy === group.slug ? index : -1))
                  .filter((i) => i !== -1)

                const fromIndex = groupedIndices[event.oldIndex]
                const toIndex = groupedIndices[event.newIndex]

                const [removed] = newItems.splice(fromIndex, 1)
                newItems.splice(toIndex, 0, removed)

                items = newItems
                onreorder?.(newItems)
              }
            }
          })
        }
      })
    }
  }

  onMount(() => {
    if (draggable) {
      // Small delay to ensure DOM is ready
      setTimeout(initializeSortable, 100)
    }
  })

  function updateItem(item: DrawerOption) {
    items = items.map((i) => {
      if (i.value === item.value) return item
      return i
    })
  }

  function toggleGroup(groupSlug: string) {
    openGroups = openGroups[groupSlug] ? {} : { [groupSlug]: true }

    // Reinitialize sortable when a group is toggled
    if (draggable) {
      setTimeout(initializeSortable, 100)
    }
  }
</script>

{#snippet drawerItem(item: DrawerOption)}
  {#if item.separator}
    <DrawerContextSeparator />
  {:else}
    <div class:px-1={!item.groupBy} class:draggable-item={draggable} class:cursor-grab={draggable}>
      <DrawerContextItem {item} {multiple} {onclick} onchange={updateItem} />
    </div>
  {/if}
{/snippet}

<div
  class="{widthClass} border border-border rounded-2xl shadow-lg bg-background flex flex-col py-1 max-h-[568px] list-none"
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
          <div
            class="w-full overflow-y-auto flex-1 min-h-0"
            transition:slide={{ duration: 200 }}
            bind:this={groupContainers[group.slug]}
          >
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
    <div class="flex-shrink-0 overflow-y-auto max-h-[564px]" bind:this={ungroupedContainer}>
      {#each ungroupedItems as item (item.value)}
        {@render drawerItem(item)}
      {/each}
    </div>
  {/if}
</div>
