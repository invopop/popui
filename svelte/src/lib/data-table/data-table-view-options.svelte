<script lang="ts" generics="TData">
  import { Sliders, Drag } from '@invopop/ui-icons'
  import type { Table } from '@tanstack/table-core'
  import type { DrawerOption } from '$lib/types.js'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import InputToggle from '$lib/InputToggle.svelte'
  import BaseButton from '$lib/BaseButton.svelte'

  let { table }: { table: Table<TData> } = $props()

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
      label: (col.columnDef.meta as any)?.label || col.id.charAt(0).toUpperCase() + col.id.slice(1),
      value: col.id,
      icon: Drag,
      action: toggleAction
    })) as DrawerOption[]

    // Only update if the order has actually changed (avoid overwriting during drag)
    const currentOrder = itemsWithActions.map(i => i.value).join(',')
    const newOrder = newItems.map(i => i.value).join(',')

    if (currentOrder !== newOrder) {
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

    // Build final order: select first (if exists), reordered columns in middle, actions last (if exists)
    const finalOrder = [
      ...(allColumnIds.includes(selectColumn) ? [selectColumn] : []),
      ...newOrder.filter((id) => id !== selectColumn && id !== actionsColumn),
      ...(allColumnIds.includes(actionsColumn) ? [actionsColumn] : [])
    ]

    table.setColumnOrder(finalOrder)
  }
</script>

{#snippet toggleAction(item: DrawerOption)}
  {@const column = table.getColumn(String(item.value))}
  {#if column?.getCanHide()}
    <InputToggle
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
