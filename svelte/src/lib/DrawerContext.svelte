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
  import { dndzone } from 'svelte-dnd-action'
  import { onMount } from 'svelte'

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

  let openGroups = $state<Record<string, boolean>>({})
  let groupDndItems = $state<Record<string, DndItem[]>>({})
  let ungroupedDndItems = $state<DndItem[]>([])
  let mounted = $state(false)
  let itemsCache = $state<DrawerOption[]>([])
  let isDragging = $state(false)
  let emitTimeout: number | undefined

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
  })

  function transformDraggedElement(draggedEl: HTMLElement | undefined) {
    if (draggedEl) {
      draggedEl.style.border = 'none'
      draggedEl.style.outline = 'none'
    }
  }

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

  function handleDndConsider(groupSlug: string, e: CustomEvent<any>) {
    if (!isDragging) {
      isDragging = true
    }
    groupDndItems[groupSlug] = e.detail.items
  }

  function handleDndFinalize(groupSlug: string, e: CustomEvent<any>) {
    isDragging = false
    groupDndItems[groupSlug] = e.detail.items

    const newItems = buildListOut()
    items = newItems
    itemsCache = JSON.parse(JSON.stringify(items))
    onreorder?.(newItems)
    emitGroupDistribution()
  }

  function handleUngroupedDndConsider(e: CustomEvent<any>) {
    if (!isDragging) {
      isDragging = true
    }
    ungroupedDndItems = e.detail.items
  }

  function handleUngroupedDndFinalize(e: CustomEvent<any>) {
    isDragging = false
    ungroupedDndItems = e.detail.items

    const newItems = buildListOut()
    items = newItems
    itemsCache = JSON.parse(JSON.stringify(items))
    onreorder?.(newItems)
    emitGroupDistribution()
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
</script>

{#snippet drawerItem(item: DrawerOption)}
  {#if item.separator}
    <DrawerContextSeparator />
  {:else}
    <div class:px-1={!item.groupBy} class:cursor-grab={draggable && !item.locked}>
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
              <div
                use:dndzone={{
                  items: groupDndItems[group.slug] || [],
                  flipDurationMs,
                  dropTargetStyle: {},
                  type: 'drawer-item',
                  transformDraggedElement
                }}
                onconsider={(e) => handleDndConsider(group.slug, e)}
                onfinalize={(e) => handleDndFinalize(group.slug, e)}
              >
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
                    <div animate:flip={{ duration: flipDurationMs }}>
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
      {#if !isLastGroup}
        <DrawerContextSeparator />
      {/if}
    {/each}
  {/if}

  {#if ungroupedItems.length}
    {#if draggable}
      <div
        class="flex-shrink-0 overflow-y-auto max-h-[564px]"
        use:dndzone={{
          items: ungroupedDndItems,
          flipDurationMs,
          dropTargetStyle: {},
          type: 'drawer-item',
          transformDraggedElement
        }}
        onconsider={handleUngroupedDndConsider}
        onfinalize={handleUngroupedDndFinalize}
      >
        {#each ungroupedDndItems as dndItem (dndItem.id)}
          <div animate:flip={{ duration: flipDurationMs }}>
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
