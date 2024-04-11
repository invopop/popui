<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import BaseTableCell from './BaseTableCell.svelte'
  import type { TableActionProp, TableDataRow, TableField } from './types.js'

  const dispatch = createEventDispatcher()

  let actionsDropdown: BaseTableActions

  export let row: TableDataRow
  export let getActions: TableActionProp = undefined
  export let fields: TableField[] = []
  export let disableRowClick = false

  $: actions = getActions instanceof Function ? getActions(row) : []
</script>

<tr
  class:cursor-pointer={!disableRowClick}
  class="hover:bg-neutral-50 active:bg-accent-50"
  on:click
  on:contextmenu|preventDefault={() => {
    if (!actionsDropdown) return

    actionsDropdown.toggle()
  }}
>
  {#each fields as field, i (i)}
    <BaseTableCell
      currentIndex={i}
      {field}
      badge={field.helperBadge ? field.helperBadge(row) : null}
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
