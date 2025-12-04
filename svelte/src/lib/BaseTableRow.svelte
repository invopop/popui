<script lang="ts">
  import BaseTableActions from './BaseTableActions.svelte'
  import type { BaseTableRowProps } from './types.js'
  import { scrollIntoTableView } from './helpers.js'
  import { TableCell, TableRow } from './table'
  import clsx from 'clsx'
  import BaseTableCellContent from './BaseTableCellContent.svelte'
  import BaseTableCheckbox from './BaseTableCheckbox.svelte'

  let actionsDropdown: BaseTableActions | undefined = $state()
  let checkboxButton: HTMLButtonElement | undefined = $state()
  let dataState: 'selected' | 'checked' | undefined = $state(undefined)

  let {
    row,
    getActions = undefined,
    fields = [],
    disableRowClick = false,
    selectable = false,
    selected = false,
    selectionMode = 'keyboard',
    selectedTrackedBy = 'id',
    selectedRows = [],
    onclick,
    onfocus,
    onmouseover,
    oncontextmenu,
    onChecked,
    onCopied,
    onClickAction
  }: BaseTableRowProps = $props()

  function scrollIntoView() {
    if (!checkboxButton) return
    scrollIntoTableView(checkboxButton)
  }

  let actions = $derived(getActions instanceof Function ? getActions(row) : [])
  let checked = $derived(
    !!selectedRows.find((r) => {
      const field = r[selectedTrackedBy]

      if (field === undefined) return false

      return field === row[selectedTrackedBy]
    })
  )

  $effect(() => {
    if (selectionMode === 'keyboard' && selected) {
      scrollIntoView()
    }
  })
  let rowClass = $derived(
    clsx({
      'cursor-pointer': !disableRowClick,
      '!hover:bg-transparent': disableRowClick
    })
  )
  $effect(() => {
    if (selected) {
      dataState = 'selected'
    } else if (checked) {
      dataState = 'checked'
    } else {
      dataState = undefined
    }
  })
</script>

<TableRow
  data-state={dataState}
  class={rowClass}
  {onclick}
  oncontextmenu={() => {
    if (!actionsDropdown) return

    actionsDropdown.toggle()

    oncontextmenu?.()
  }}
  onmouseover={() => {
    if (selectionMode === 'keyboard') return
    onmouseover?.()
  }}
  {onfocus}
>
  {#if selectable}
    <TableCell>
      <BaseTableCheckbox bind:checkboxButton {checked} {onChecked} />
    </TableCell>
  {/if}
  {#each fields as field, i (i)}
    {@const extraPaddingLeft = i === 0 && !selectable}
    {@const extraPaddingRight = i === fields.length - 1 && !actions.length}
    <TableCell
      class={clsx({
        'font-medium': i === 0,
        'pl-6': extraPaddingLeft,
        'pl-3': !extraPaddingLeft,
        'pr-6': extraPaddingRight,
        'pr-3': !extraPaddingRight,
        'py-2': field.copy
      })}
    >
      <BaseTableCellContent
        {field}
        badge={field.helperBadge ? field.helperBadge(row) : null}
        status={field.helperStatus ? field.helperStatus(row) : null}
        icons={field.helperIcons ? field.helperIcons(row) : null}
        data={field.formatter ? field.formatter(row) : row[field.slug] || ''}
        {onCopied}
      />
    </TableCell>
  {/each}
  {#if actions.length}
    <TableCell class="py-2">
      <BaseTableActions
        bind:this={actionsDropdown}
        {actions}
        onclick={(action) => {
          onClickAction?.({ row, action })
        }}
      />
    </TableCell>
  {/if}
</TableRow>
