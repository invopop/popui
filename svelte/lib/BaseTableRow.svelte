<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import BaseTableCell from './BaseTableCell.svelte'
  import type { TableActionProp, TableDataRow, TableField } from './types.js'
  import InputCheckbox from './InputCheckbox.svelte'

  const dispatch = createEventDispatcher()

  let actionsDropdown: BaseTableActions

  export let row: TableDataRow
  export let getActions: TableActionProp = undefined
  export let fields: TableField[] = []
  export let disableRowClick = false
  export let freeWrap = false
  export let selectable = false
  export let selectedTrackedBy = 'id'
  export let selectedRows: TableDataRow[] = []

  $: actions = getActions instanceof Function ? getActions(row) : []

  $: checked = !!selectedRows.find((r) => {
    const field = r[selectedTrackedBy]

    if (field === undefined) return false

    return field === row[selectedTrackedBy]
  })
</script>

<tr
  class:cursor-pointer={!disableRowClick}
  class:bg-workspace-accent-50={checked}
  class="hover:bg-neutral-50"
  on:click
  on:contextmenu|preventDefault={() => {
    if (!actionsDropdown) return

    actionsDropdown.toggle()
  }}
>
  {#if selectable}
    <td class="pl-1.5">
      <InputCheckbox
        {checked}
        on:change={(event) => {
          dispatch('checked', event.detail)
        }}
      />
    </td>
  {/if}
  {#each fields as field, i (i)}
    <BaseTableCell
      currentIndex={i}
      {field}
      {freeWrap}
      badge={field.helperBadge ? field.helperBadge(row) : null}
      status={field.helperStatus ? field.helperStatus(row) : null}
      icons={field.helperIcons ? field.helperIcons(row) : null}
      data={field.formatter ? field.formatter(row) : row[field.slug] || ''}
      on:copied
    />
  {/each}
  {#if actions.length}
    <td class="pl-1 pr-3">
      <BaseTableActions
        bind:this={actionsDropdown}
        {actions}
        on:clickAction={(event) => {
          dispatch('action', { row, action: event.detail })
        }}
      />
    </td>
  {/if}
</tr>
