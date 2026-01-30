<script lang="ts" generics="TData">
  import { Sliders, Drag } from '@invopop/ui-icons'
  import type { Table } from '@tanstack/table-core'
  import type { DrawerOption, DrawerGroup } from '$lib/types.js'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import InputToggle from '$lib/InputToggle.svelte'
  import BaseButton from '$lib/BaseButton.svelte'
  import { capitalize } from '$lib/helpers.js'

  let {
    table,
    frozenColumns,
    onFreezeColumn
  }: {
    table: Table<TData>
    frozenColumns: Set<string>
    onFreezeColumn: (columnId: string) => void
  } = $props()

  const groups: DrawerGroup[] = [
    {
      label: 'Frozen columns',
      slug: 'frozen',
      emptyDescription: 'Drop items to this list',
      hideCounter: true
    },
    {
      label: 'Table options',
      slug: 'regular',
      emptyDescription: 'Drop items to this list',
      hideCounter: true
    }
  ]

  let itemsWithActions = $derived.by(() => {
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

    return orderedColumns.map((col) => {
      const isFrozen = frozenColumns.has(col?.id || '')
      return {
        label: (col?.columnDef.header as string) || capitalize(col?.id || ''),
        value: col?.id,
        icon: Drag,
        action: toggleAction,
        groupBy: isFrozen ? 'frozen' : 'regular'
      }
    }) as DrawerOption[]
  })

  function handleDropItem(groupsDistribution: Record<string, DrawerOption[]>) {
    const frozenItems = groupsDistribution['frozen'] || []
    const regularItems = groupsDistribution['regular'] || []

    // Build sets of what should be frozen and regular after the drop
    const shouldBeFrozen = new Set(frozenItems.map((item) => item.value as string))
    const shouldBeRegular = new Set(regularItems.map((item) => item.value as string))

    // Freeze columns that are in the frozen group but not currently frozen
    shouldBeFrozen.forEach((columnId) => {
      if (!frozenColumns.has(columnId)) {
        onFreezeColumn(columnId)
      }
    })

    // Unfreeze columns that are in the regular group but currently frozen
    shouldBeRegular.forEach((columnId) => {
      if (frozenColumns.has(columnId)) {
        onFreezeColumn(columnId)
      }
    })

    // Get all column IDs from the table
    const allColumnIds = table.getAllColumns().map((col) => col.id)
    const selectColumn = 'select'
    const actionsColumn = 'actions'

    // Build the final column order: select, frozen (in order), regular (in order), actions
    const frozenOrder = frozenItems.map((item) => item.value as string)
    const regularOrder = regularItems.map((item) => item.value as string)

    const finalOrder = [
      ...(allColumnIds.includes(selectColumn) ? [selectColumn] : []),
      ...frozenOrder,
      ...regularOrder,
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
  <DrawerContext
    items={itemsWithActions}
    {groups}
    draggable
    collapsibleGroups={false}
    ondropitem={handleDropItem}
  />
</BaseDropdown>
