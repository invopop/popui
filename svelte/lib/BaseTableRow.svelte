<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import BaseTableCell from './BaseTableCell.svelte'
  import type { TableActionProp, TableDataRow, TableField } from './types.js'
  import InputCheckbox from './InputCheckbox.svelte'
  import { scrollIntoTableView } from './helpers.js'

  const dispatch = createEventDispatcher()

  let actionsDropdown: BaseTableActions
  let checkboxButton: HTMLButtonElement

  export let row: TableDataRow
  export let getActions: TableActionProp = undefined
  export let fields: TableField[] = []
  export let disableRowClick = false
  export let freeWrap = false
  export let selectable = false
  export let selected = false
  export let selectionMode = 'keyboard'
  export let selectedTrackedBy = 'id'
  export let selectedRows: TableDataRow[] = []

  $: actions = getActions instanceof Function ? getActions(row) : []

  $: checked = !!selectedRows.find((r) => {
    const field = r[selectedTrackedBy]

    if (field === undefined) return false

    return field === row[selectedTrackedBy]
  })

  $: if (selectionMode === 'keyboard' && selected) {
    scrollIntoView()
  }

  function scrollIntoView() {
    scrollIntoTableView(checkboxButton)
  }
</script>

<tr
  class:cursor-pointer={!disableRowClick}
  class:bg-neutral-50={selected}
  class:bg-workspace-accent-50={checked && !selected}
  on:click
  on:contextmenu|preventDefault={() => {
    if (!actionsDropdown) return

    actionsDropdown.toggle()
  }}
  on:mouseover={() => {
    if (selectionMode === 'keyboard') return
    dispatch('hover')
  }}
  on:focus={() => {
    dispatch('focus')
  }}
>
  {#if selectable}
    <td>
      <button
        bind:this={checkboxButton}
        class="px-5 h-[40px] flex items-center outline-none group cursor-default"
        on:click|stopPropagation={() => {
          dispatch('checked', checked)
        }}
      >
        <div class:invisible={selectedRows.length === 0} class="group-hover:visible">
          <InputCheckbox
            {checked}
            on:change={(event) => {
              dispatch('checked', event.detail)
            }}
          />
        </div>
      </button>
    </td>
  {/if}
  {#each fields as field, i (i)}
    <BaseTableCell
      isFirst={i === 0}
      isLast={i === fields.length - 1}
      {field}
      {freeWrap}
      {selectable}
      hasActions={!!actions.length}
      badge={field.helperBadge ? field.helperBadge(row) : null}
      status={field.helperStatus ? field.helperStatus(row) : null}
      icons={field.helperIcons ? field.helperIcons(row) : null}
      data={field.formatter ? field.formatter(row) : row[field.slug] || ''}
      on:copied
    />
  {/each}
  {#if actions.length}
    <td class="pl-1 pr-5">
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
