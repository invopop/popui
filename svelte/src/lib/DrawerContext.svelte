<script lang="ts">
  import type { DrawerContextProps, DrawerOption, AnyProp } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import DrawerContextSeparator from './DrawerContextSeparator.svelte'
  import EmptyState from './EmptyState.svelte'
  import BaseCounter from './BaseCounter.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronRight } from '@steeze-ui/heroicons'
  import { slide } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import {
    draggable as makeDraggable,
    dropTargetForElements
  } from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
  import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
  import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element'
  import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'
  import {
    attachClosestEdge,
    extractClosestEdge,
    type Edge
  } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
  import { onMount, onDestroy, untrack } from 'svelte'
  import {
    shouldShowDropIndicator,
    reorderItems,
    moveItemBetweenGroups,
    type DropIndicatorState,
    type DndItem as DndItemType
  } from './drawer-dnd-helpers'
  import {
    getFocusableItems,
    getNextFocusedIndex,
    selectFocusedItem
  } from './drawer-keyboard-helpers'

  const flipDurationMs = 150

  let {
    items = $bindable([]),
    multiple = false,
    draggable = false,
    widthClass = 'w-60',
    collapsibleGroups = true,
    onclick,
    onselect,
    onreorder,
    ondropitem,
    children,
    groups
  }: DrawerContextProps = $props()

  type DndItem = DrawerOption & { id: string }

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

  // Items in display order (matches visual rendering order)
  let itemsInDisplayOrder = $derived.by(() => {
    const displayOrder: DrawerOption[] = []

    if (hasGroups && groups) {
      // Add grouped items in group order, only if group is open (when collapsible)
      groups.forEach((group) => {
        const isOpen = collapsibleGroups ? openGroups[group.slug] : true
        if (isOpen) {
          const groupItems = groupedItems.get(group.slug) || []
          displayOrder.push(...groupItems)
        }
      })
    }

    // Add ungrouped items
    displayOrder.push(...ungroupedItems)

    return displayOrder
  })

  let openGroups = $state<Record<string, boolean>>({})
  let groupDndItems = $state<Record<string, DndItem[]>>({})
  let ungroupedDndItems = $state<DndItem[]>([])
  let mounted = $state(false)
  let itemsCache = $state<DrawerOption[]>([])
  let isDragging = $state(false)
  let draggedItemId = $state<string | null>(null)
  let emitTimeout: number | undefined
  let draggedOverGroup = $state<string | null>(null)
  let dropIndicator = $state<DropIndicatorState>(null)
  let cleanupFunctions: (() => void)[] = []
  let focusedIndex = $state<number>(-1)
  let containerRef = $state<HTMLDivElement | null>(null)

  // Build internal DND items from external items
  function buildListIn() {
    if (hasGroups) {
      // Build DND items for each group
      groups!.forEach((group) => {
        const groupItems = groupedItems.get(group.slug) || []
        groupDndItems[group.slug] = groupItems.map((item: DrawerOption, i: number) => ({
          ...item,
          id: `${group.slug}-${item.value}-${i}`
        }))
      })
    }

    // Build DND items for ungrouped
    ungroupedDndItems = ungroupedItems.map((item, i) => ({
      ...item,
      id: `ungrouped-${item.value}-${i}`
    }))
  }

  // Build external items from internal DND items
  function buildListOut() {
    const newItems: DrawerOption[] = []
    const used = new Set<AnyProp>()

    // Add all grouped items
    if (hasGroups) {
      groups!.forEach((group) => {
        const dndItems = groupDndItems[group.slug] || []
        dndItems.forEach((dndItem) => {
          if (!used.has(dndItem.value)) {
            const { id, ...item } = dndItem
            newItems.push({ ...item, groupBy: group.slug })
            used.add(dndItem.value)
          }
        })
      })
    }

    // Add ungrouped items
    ungroupedDndItems.forEach((dndItem) => {
      if (!used.has(dndItem.value)) {
        const { id, ...item } = dndItem
        newItems.push(item)
        used.add(dndItem.value)
      }
    })

    return newItems
  }

  // Sync items when they change from outside
  $effect(() => {
    if (items && mounted && !isDragging) {
      if (JSON.stringify(items) !== JSON.stringify(itemsCache)) {
        buildListIn()
        itemsCache = JSON.parse(JSON.stringify(items))
      }
    }
  })

  // Open group with selected item on mount
  $effect(() => {
    if (hasGroups) {
      const selectedItem = items.find((i) => i.selected)
      if (selectedItem?.groupBy && Object.keys(openGroups).length === 0) {
        openGroups = { [selectedItem.groupBy]: true }
      }
    }
  })

  // Notify parent of selection changes
  $effect(() => {
    onselect?.(selectedItems)
  })

  onMount(() => {
    itemsCache = JSON.parse(JSON.stringify(items))
    buildListIn()
    mounted = true

    // Set up auto-scroll
    const autoScrollCleanup = autoScrollForElements({
      element: document.documentElement
    })
    cleanupFunctions.push(autoScrollCleanup)

    window.addEventListener('keydown', handleKeyDown)
  })

  onDestroy(() => {
    cleanupFunctions.forEach((cleanup) => cleanup())
    cleanupFunctions = []
    window.removeEventListener('keydown', handleKeyDown)
  })

  function emitGroupDistribution() {
    if (ondropitem && hasGroups) {
      // Clear any pending emit
      if (emitTimeout) {
        clearTimeout(emitTimeout)
      }

      // Debounce the emit to avoid duplicate calls when dragging between groups
      emitTimeout = window.setTimeout(() => {
        const groupsDistribution: Record<string, DrawerOption[]> = {}
        groups!.forEach((group) => {
          const dndItems = groupDndItems[group.slug] || []
          groupsDistribution[group.slug] = dndItems.map(({ id, ...item }) => item)
        })
        ondropitem(groupsDistribution)
      }, 0)
    }
  }

  // Setup draggable item (Svelte action)
  function setupDraggableItem(element: HTMLElement, params: [DndItem, string]) {
    const [dndItem, groupSlug] = params
    if (!element || dndItem.locked) return

    const cleanup = makeDraggable({
      element,
      getInitialData: () => ({ id: dndItem.id, groupSlug, type: 'drawer-item' }),
      onDragStart: () => {
        isDragging = true
        draggedItemId = dndItem.id
        dropIndicator = null
      },
      onDrop: () => {
        isDragging = false
        draggedItemId = null
        dropIndicator = null
      }
    })

    return {
      destroy() {
        cleanup()
      }
    }
  }

  // Setup drop zone for a container (group or ungrouped) (Svelte action)
  function setupDropZone(element: HTMLElement, groupSlug: string) {
    if (!element) return

    const cleanup = dropTargetForElements({
      element,
      getData: () => {
        const items = groupSlug === 'ungrouped' ? ungroupedDndItems : groupDndItems[groupSlug] || []
        return { groupSlug, items: items.map((i) => i.id) }
      },
      canDrop: ({ source }) => source.data.type === 'drawer-item',
      onDragEnter: () => {
        draggedOverGroup = groupSlug
      },
      onDragLeave: () => {
        if (draggedOverGroup === groupSlug) {
          draggedOverGroup = null
        }
      },
      onDrop: ({ source, location }) => {
        draggedOverGroup = null
        dropIndicator = null
        const sourceId = source.data.id as string
        const sourceGroup = source.data.groupSlug as string
        const targetGroup = groupSlug

        // Get source and target arrays
        const sourceItems =
          sourceGroup === 'ungrouped' ? ungroupedDndItems : groupDndItems[sourceGroup] || []
        const targetItems =
          targetGroup === 'ungrouped' ? ungroupedDndItems : groupDndItems[targetGroup] || []

        // Find the dragged item
        const sourceIndex = sourceItems.findIndex((item) => item.id === sourceId)
        if (sourceIndex === -1) return

        const draggedItem = sourceItems[sourceIndex]

        // If moving within the same group, we need to handle reordering
        if (sourceGroup === targetGroup) {
          // Check if we're dropping on another item
          const dropTargets = location.current.dropTargets
          const itemDropTarget = dropTargets.find((target) => target.data.itemId)

          if (itemDropTarget) {
            const targetItemId = itemDropTarget.data.itemId as string
            const edge = extractClosestEdge(itemDropTarget.data)

            if (edge) {
              const newItems = reorderItems(targetItems, sourceId, targetItemId, edge)

              if (targetGroup === 'ungrouped') {
                ungroupedDndItems = newItems
              } else {
                groupDndItems[targetGroup] = newItems
              }
            }
          }
        } else {
          // Moving between groups
          const dropTargets = location.current.dropTargets
          const itemDropTarget = dropTargets.find((target) => target.data.itemId)

          let targetItemId: string | undefined
          let edge: Edge | undefined

          if (itemDropTarget) {
            targetItemId = itemDropTarget.data.itemId as string
            edge = extractClosestEdge(itemDropTarget.data) || undefined
          }

          const { newSourceItems, newTargetItems } = moveItemBetweenGroups(
            sourceItems,
            targetItems,
            sourceId,
            targetItemId,
            edge
          )

          if (sourceGroup === 'ungrouped') {
            ungroupedDndItems = newSourceItems
          } else {
            groupDndItems[sourceGroup] = newSourceItems
          }

          if (targetGroup === 'ungrouped') {
            ungroupedDndItems = newTargetItems
          } else {
            groupDndItems[targetGroup] = newTargetItems
          }
        }

        // Update items and notify
        const newItems = buildListOut()
        items = newItems
        itemsCache = JSON.parse(JSON.stringify(items))
        onreorder?.(newItems)
        emitGroupDistribution()
      }
    })

    return {
      destroy() {
        cleanup()
      }
    }
  }

  // Setup drop zone for individual items (for reordering within same group) (Svelte action)
  function setupItemDropZone(element: HTMLElement, params: [DndItem, string]) {
    const [dndItem, groupSlug] = params
    if (!element) return

    const cleanup = dropTargetForElements({
      element,
      getData: ({ input }) => {
        const data = { itemId: dndItem.id, groupSlug }
        return attachClosestEdge(data, {
          element,
          input,
          allowedEdges: ['top', 'bottom']
        })
      },
      canDrop: ({ source }) => {
        return source.data.type === 'drawer-item' && source.data.id !== dndItem.id
      },
      onDragEnter: ({ self, source }) => {
        const edge = extractClosestEdge(self.data)
        if (!edge) return

        const sourceId = source.data.id as string
        const sourceGroup = source.data.groupSlug as string
        const items = groupSlug === 'ungrouped' ? ungroupedDndItems : groupDndItems[groupSlug] || []

        if (shouldShowDropIndicator(sourceId, dndItem.id, sourceGroup, groupSlug, edge, items)) {
          dropIndicator = { itemId: dndItem.id, edge }
        }
      },
      onDrag: ({ self, source }) => {
        const edge = extractClosestEdge(self.data)
        if (!edge) return

        const sourceId = source.data.id as string
        const sourceGroup = source.data.groupSlug as string
        const items = groupSlug === 'ungrouped' ? ungroupedDndItems : groupDndItems[groupSlug] || []

        if (shouldShowDropIndicator(sourceId, dndItem.id, sourceGroup, groupSlug, edge, items)) {
          dropIndicator = { itemId: dndItem.id, edge }
        } else {
          dropIndicator = null
        }
      },
      onDragLeave: () => {
        if (dropIndicator?.itemId === dndItem.id) {
          dropIndicator = null
        }
      },
      onDrop: () => {
        dropIndicator = null
      }
    })

    return {
      destroy() {
        cleanup()
      }
    }
  }

  function updateItem(item: DrawerOption) {
    items = items.map((i) => {
      if (i.value === item.value) return item
      return i
    })
  }

  function toggleGroup(groupSlug: string) {
    openGroups = openGroups[groupSlug] ? {} : { [groupSlug]: true }
  }

  let focusedItemValue = $derived.by(() => {
    const focusableItems = getFocusableItems(itemsInDisplayOrder)
    if (focusedIndex >= 0 && focusedIndex < focusableItems.length) {
      return focusableItems[focusedIndex].value
    }
    return null
  })

  function handleKeyDown(event: KeyboardEvent) {
    // Don't handle if container doesn't exist
    if (!containerRef || !document.body.contains(containerRef)) return

    const focusableItems = getFocusableItems(itemsInDisplayOrder)
    if (focusableItems.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusedIndex = getNextFocusedIndex(focusedIndex, 'down', focusableItems.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusedIndex = getNextFocusedIndex(focusedIndex, 'up', focusableItems.length)
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      const result = selectFocusedItem(itemsInDisplayOrder, focusedIndex, multiple)
      if (result) {
        if (result.shouldUpdate) {
          updateItem(result.item)
        } else {
          onclick?.(result.item.value)
        }
      }
    }
  }
</script>

{#snippet drawerItem(item: DrawerOption)}
  {#if item.separator}
    <DrawerContextSeparator />
  {:else}
    <div class:px-1={!item.groupBy} class:cursor-grab={draggable && !item.locked}>
      <DrawerContextItem
        item={{ ...item, focused: item.value === focusedItemValue }}
        {multiple}
        {onclick}
        onchange={updateItem}
      />
    </div>
  {/if}
{/snippet}

<div
  bind:this={containerRef}
  class="{widthClass} border border-border rounded-2xl shadow-lg bg-background flex flex-col py-1 max-h-[568px] list-none"
>
  {@render children?.()}

  {#if hasGroups && groups}
    {#each groups as group, index}
      {@const groupItems = groupedItems.get(group.slug) || []}
      {@const isLastGroup = index === groups!.length - 1}
      {@const isOpen = collapsibleGroups ? openGroups[group.slug] : true}
      {@const hasOpenGroup = collapsibleGroups ? Object.values(openGroups).some((v) => v) : true}
      <div
        class="px-1"
        class:flex-1={isOpen && collapsibleGroups}
        class:flex={isOpen}
        class:flex-col={isOpen}
        class:min-h-0={isOpen && collapsibleGroups}
        class:flex-shrink-0={!isOpen && hasOpenGroup && collapsibleGroups}
      >
        {#if collapsibleGroups}
          <button
            class="cursor-pointer flex items-center justify-between h-8 pl-2.5 pr-2.5 py-2.5 text-base font-medium text-foreground-default-secondary w-full hover:bg-background-default-secondary rounded-lg overflow-clip flex-shrink-0 outline-none"
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
            {#if groupItems.length && !group.hideCounter}
              <BaseCounter value={groupItems.length} />
            {/if}
          </button>
        {:else}
          <div
            class="flex items-center justify-between h-8 pl-2.5 pr-2.5 py-2.5 text-base font-medium text-foreground-default-secondary w-full overflow-clip flex-shrink-0"
          >
            <span>{group.label}</span>
            {#if groupItems.length && !group.hideCounter}
              <BaseCounter value={groupItems.length} />
            {/if}
          </div>
        {/if}

        {#if isOpen}
          <div
            class="w-full overflow-y-auto {collapsibleGroups ? 'flex-1 min-h-0' : ''}"
            transition:slide={{ duration: collapsibleGroups ? 200 : 0 }}
          >
            {#if draggable}
              <div use:setupDropZone={group.slug} class="min-h-[40px]">
                {#if !groupItems.length}
                  <div class="px-1 pt-1 pb-5">
                    <EmptyState
                      iconSource={group.emptyIcon}
                      title={group.emptyTitle}
                      description={group.emptyDescription}
                    />
                  </div>
                {:else}
                  {#each groupDndItems[group.slug] || [] as dndItem (dndItem.id)}
                    {@const showTopIndicator =
                      dropIndicator?.itemId === dndItem.id && dropIndicator?.edge === 'top'}
                    {@const showBottomIndicator =
                      dropIndicator?.itemId === dndItem.id && dropIndicator?.edge === 'bottom'}
                    {@const isBeingDragged = draggedItemId === dndItem.id}
                    <div
                      animate:flip={{ duration: isDragging ? flipDurationMs : 0 }}
                      use:setupDraggableItem={[dndItem, group.slug]}
                      use:setupItemDropZone={[dndItem, group.slug]}
                      class:border-t-2={showTopIndicator}
                      class:border-t-accent-50={showTopIndicator}
                      class:border-b-2={showBottomIndicator}
                      class:border-b-accent-50={showBottomIndicator}
                      class:opacity-40={isBeingDragged}
                      class="transition-opacity"
                    >
                      {@render drawerItem(dndItem)}
                    </div>
                  {/each}
                {/if}
              </div>
            {:else if !groupItems.length}
              <div class="px-1 pt-1 pb-5">
                <EmptyState
                  iconSource={group.emptyIcon}
                  title={group.emptyTitle}
                  description={group.emptyDescription}
                />
              </div>
            {:else}
              {#each groupItems as item (item.value)}
                {@render drawerItem(item)}
              {/each}
            {/if}
          </div>
        {/if}
      </div>
      {#if !isLastGroup && collapsibleGroups}
        <DrawerContextSeparator />
      {/if}
    {/each}
  {/if}

  {#if ungroupedItems.length}
    {#if draggable}
      <div
        class="flex-shrink-0 overflow-y-auto max-h-[564px] min-h-[40px]"
        use:setupDropZone={'ungrouped'}
      >
        {#each ungroupedDndItems as dndItem (dndItem.id)}
          {@const showTopIndicator =
            dropIndicator?.itemId === dndItem.id && dropIndicator?.edge === 'top'}
          {@const showBottomIndicator =
            dropIndicator?.itemId === dndItem.id && dropIndicator?.edge === 'bottom'}
          {@const isBeingDragged = draggedItemId === dndItem.id}
          <div
            animate:flip={{ duration: isDragging ? flipDurationMs : 0 }}
            use:setupDraggableItem={[dndItem, 'ungrouped']}
            use:setupItemDropZone={[dndItem, 'ungrouped']}
            class:border-t-2={showTopIndicator}
            class:border-t-accent-50={showTopIndicator}
            class:border-b-2={showBottomIndicator}
            class:border-b-accent-50={showBottomIndicator}
            class:opacity-40={isBeingDragged}
            class="transition-opacity"
          >
            {@render drawerItem(dndItem)}
          </div>
        {/each}
      </div>
    {:else}
      <div class="flex-shrink-0 overflow-y-auto max-h-[564px]">
        {#each ungroupedItems as item (item.value)}
          {@render drawerItem(item)}
        {/each}
      </div>
    {/if}
  {/if}
</div>
