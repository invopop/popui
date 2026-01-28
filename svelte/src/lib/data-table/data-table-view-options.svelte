<script lang="ts" generics="TData">
  import { Sliders, Drag } from '@invopop/ui-icons'
  import type { Table } from '@tanstack/table-core'
  import type { DrawerOption } from '$lib/types.js'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import InputToggle from '$lib/InputToggle.svelte'
  import BaseButton from '$lib/BaseButton.svelte'
  import { capitalize } from '$lib/helpers.js'

  let { table, frozenColumns }: { table: Table<TData>; frozenColumns: Set<string> } = $props()

  let itemsWithActions = $state<DrawerOption[]>([])

  // Initialize and update items when table state changes
  $effect(() => {
    const columnOrder = table.getState().columnOrder
    const allColumns = table.getAllColumns()

    let orderedColumns
    // If there's a custom order, use it; otherwise use default order
    if (columnOrder.length > 0) {
      orderedColumns = columnOrder
        .map((id) => allColumns.find((col) => col.id === id))
        .filter((col) => col && col.id !== 'select' && col.id !== 'actions')
    } else {
      orderedColumns = allColumns.filter((col) => col.id !== 'select' && col.id !== 'actions')
    }

    const newItems = orderedColumns.map((col) => ({
      label: (col?.columnDef.header as string) || capitalize(col?.id || ''),
      value: col?.id,
      icon: Drag,
      action: toggleAction,
      locked: frozenColumns.has(col?.id || '')
    })) as DrawerOption[]

    // Only update if the order or locked status has changed (avoid overwriting during drag)
    const currentOrder = itemsWithActions.map((i) => i.value).join(',')
    const newOrder = newItems.map((i) => i.value).join(',')
    const currentLocked = itemsWithActions.map((i) => i.locked ? '1' : '0').join(',')
    const newLocked = newItems.map((i) => i.locked ? '1' : '0').join(',')

    if (currentOrder !== newOrder || currentLocked !== newLocked) {
      itemsWithActions = newItems
    }
  })

  function handleReorder(reorderedItems: any[]) {
    // Update local items to match the drag order immediately
    itemsWithActions = reorderedItems

    const newOrder = reorderedItems.map((item) => item.value)
    // Get all column IDs from the table
    const allColumnIds = table.getAllColumns().map((col) => col.id)

    // Filter to keep select and actions in their fixed positions
    const selectColumn = 'select'
    const actionsColumn = 'actions'

    // Separate frozen and non-frozen columns from reordered items
    const frozenCols = newOrder.filter((id) => frozenColumns.has(id))
    const nonFrozenCols = newOrder.filter((id) => !frozenColumns.has(id) && id !== selectColumn && id !== actionsColumn)

    // Build final order: select first, then frozen columns (in order), then non-frozen columns, then actions
    const finalOrder = [
      ...(allColumnIds.includes(selectColumn) ? [selectColumn] : []),
      ...frozenCols,
      ...nonFrozenCols,
      ...(allColumnIds.includes(actionsColumn) ? [actionsColumn] : [])
    ]

    table.setColumnOrder(finalOrder)
  }
</script>

{#snippet toggleAction(item: DrawerOption)}
  {@const column = table.getColumn(String(item.value))}
  {#if column?.getCanHide()}
    <InputToggle
      class="cursor-default"
      checked={column?.getIsVisible() ?? false}
      onchange={(v) => column?.toggleVisibility(!!v)}
    />
  {/if}
{/snippet}

<BaseDropdown class="ms-auto hidden lg:flex">
  {#snippet trigger()}
    <BaseButton icon={Sliders} variant="outline" size="md" />
  {/snippet}
  <DrawerContext items={itemsWithActions} draggable={true} onreorder={handleReorder}>
    <div class="p-3 py-1.5 text-sm font-medium text-foreground-default-secondary">
      Table options
    </div>
  </DrawerContext>
</BaseDropdown>
