<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import type { TableActionProp, TableDataRow, TableField } from './types.js'
  import { scrollIntoTableView } from './helpers.js'
  import { TableCell, TableRow } from './table'
  import clsx from 'clsx'
  import BaseTableCellContent from './BaseTableCellContent.svelte'
  import BaseTableCheckbox from './BaseTableCheckbox.svelte'

  const dispatch = createEventDispatcher()

  let actionsDropdown: BaseTableActions
  let checkboxButton: HTMLButtonElement
  let dataState: 'selected' | 'checked' | undefined = undefined

  export let row: TableDataRow
  export let getActions: TableActionProp = undefined
  export let fields: TableField[] = []
  export let disableRowClick = false
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

  $: rowClass = clsx({
    'cursor-pointer': !disableRowClick,
    '!hover:bg-transparent': disableRowClick
  })

  $: {
    if (selected) {
      dataState = 'selected'
    } else if (checked) {
      dataState = 'checked'
    } else {
      dataState = undefined
    }
  }
</script>

<TableRow
  data-state={dataState}
  class={rowClass}
  on:click
  on:contextmenu={() => {
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
    <TableCell>
      <BaseTableCheckbox
        bind:checkboxButton
        {checked}
        hidden={selectedRows.length === 0}
        on:checked
      />
    </TableCell>
  {/if}
  {#each fields as field, i (i)}
    <TableCell>
      <BaseTableCellContent
        {field}
        badge={field.helperBadge ? field.helperBadge(row) : null}
        status={field.helperStatus ? field.helperStatus(row) : null}
        icons={field.helperIcons ? field.helperIcons(row) : null}
        data={field.formatter ? field.formatter(row) : row[field.slug] || ''}
        on:copied
      />
    </TableCell>
  {/each}
  {#if actions.length}
    <TableCell>
      <BaseTableActions
        bind:this={actionsDropdown}
        {actions}
        on:clickAction={(event) => {
          dispatch('action', { row, action: event.detail })
        }}
      />
    </TableCell>
  {/if}
</TableRow>
