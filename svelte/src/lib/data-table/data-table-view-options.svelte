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
    table.getAllColumns().filter((col) => typeof col.accessorFn !== 'undefined' && col.getCanHide())
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
    // Always keep 'select' as the first column, followed by reordered columns, then 'actions' at the end
    const selectColumn = 'select'
    const actionsColumn = 'actions'
    const finalOrder = [selectColumn, ...newOrder, actionsColumn]
    table.setColumnOrder(finalOrder)
  }
</script>

{#snippet toggleAction(item: DrawerOption)}
  {@const column = table.getColumn(String(item.value))}
  <InputToggle
    checked={column?.getIsVisible() ?? false}
    onchange={(v) => column?.toggleVisibility(!!v)}
  />
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
