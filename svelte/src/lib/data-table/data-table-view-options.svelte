<script lang="ts" generics="TData">
  import { Sliders, Drag } from '@invopop/ui-icons'
  import type { Table } from '@tanstack/table-core'
  import type { DrawerOption } from '$lib/types.js'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import InputToggle from '$lib/InputToggle.svelte'
  import BaseButton from '$lib/BaseButton.svelte'

  let { table }: { table: Table<TData> } = $props()

  const columns = $derived(
    table.getAllColumns().filter((col) =>
      typeof col.accessorFn !== 'undefined' && col.id !== 'select' && col.id !== 'actions'
    )
  )

  let itemsWithActions = $derived(
    columns.map((col) => ({
      label: col.id.charAt(0).toUpperCase() + col.id.slice(1),
      value: col.id,
      icon: Drag,
      action: toggleAction
    })) as DrawerOption[]
  )

  function handleReorder(reorderedItems: any[]) {
    const newOrder = reorderedItems.map((item) => item.value)
    // Get all column IDs from the table
    const allColumns = table.getAllColumns().map((col) => col.id)

    // Filter to keep select and actions in their fixed positions
    const selectColumn = 'select'
    const actionsColumn = 'actions'

    // Build final order: select first, reordered columns in middle, actions last
    const finalOrder = [
      selectColumn,
      ...newOrder.filter((id) => id !== selectColumn && id !== actionsColumn),
      actionsColumn
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
