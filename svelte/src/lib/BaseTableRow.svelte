<script lang="ts">
  import { run } from 'svelte/legacy';

  import { createEventDispatcher } from 'svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import type { TableActionProp, TableDataRow, TableField } from './types.js'
  import { scrollIntoTableView } from './helpers.js'
  import { TableCell, TableRow } from './table'
  import clsx from 'clsx'
  import BaseTableCellContent from './BaseTableCellContent.svelte'
  import BaseTableCheckbox from './BaseTableCheckbox.svelte'

  const dispatch = createEventDispatcher()

  let actionsDropdown: BaseTableActions = $state()
  let checkboxButton: HTMLButtonElement = $state()
  let dataState: 'selected' | 'checked' | undefined = $state(undefined)

  interface Props {
    row: TableDataRow;
    getActions?: TableActionProp;
    fields?: TableField[];
    disableRowClick?: boolean;
    selectable?: boolean;
    selected?: boolean;
    selectionMode?: string;
    selectedTrackedBy?: string;
    selectedRows?: TableDataRow[];
  }

  let {
    row,
    getActions = undefined,
    fields = [],
    disableRowClick = false,
    selectable = false,
    selected = false,
    selectionMode = 'keyboard',
    selectedTrackedBy = 'id',
    selectedRows = []
  }: Props = $props();




  function scrollIntoView() {
    scrollIntoTableView(checkboxButton)
  }


  let actions = $derived(getActions instanceof Function ? getActions(row) : [])
  let checked = $derived(!!selectedRows.find((r) => {
    const field = r[selectedTrackedBy]

    if (field === undefined) return false

    return field === row[selectedTrackedBy]
  }))
  run(() => {
    if (selectionMode === 'keyboard' && selected) {
      scrollIntoView()
    }
  });
  let rowClass = $derived(clsx({
    'cursor-pointer': !disableRowClick,
    '!hover:bg-transparent': disableRowClick
  }))
  run(() => {
    if (selected) {
      dataState = 'selected'
    } else if (checked) {
      dataState = 'checked'
    } else {
      dataState = undefined
    }
  });
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
    <TableCell
      class="{i === 0 && !selectable ? 'pl-6' : 'pl-3'}  {i === fields.length - 1 && !actions.length
        ? 'pr-6'
        : 'pr-3'}"
    >
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
