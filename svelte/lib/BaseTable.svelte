<script lang="ts">
  import { intersect } from 'svelte-intersection-observer-action'
  import type {
    TableActionProp,
    TableDataRow,
    TableField,
    TableGroup,
    TableGroupLabelProp,
    TableSortBy
  } from './types.js'
  import { createEventDispatcher } from 'svelte'
  import BaseCounter from './BaseCounter.svelte'
  import BaseTableRow from './BaseTableRow.svelte'
  import { isInputFocused } from './helpers.js'
  import BaseTableCellContent from './BaseTableCellContent.svelte'
  import { Table, TableHead, TableHeader, TableRow } from './table/index.js'
  import BaseTableCheckbox from './BaseTableCheckbox.svelte'
  import BaseTableHeaderContent from './BaseTableHeaderContent.svelte'
  import TableBody from './table/table-body.svelte'

  const dispatch = createEventDispatcher()
  const callback = (entry: IntersectionObserverEntry) => {
    if (entry.intersectionRatio && entry.isIntersecting) {
      dispatch('tableEndReached')
    }
  }
  const intersectOptions = { callback }

  let metaKeyPressed = false
  let shiftKeyPressed = false
  let lastSelected: TableDataRow = {}
  let lastSelectedForShift: TableDataRow = {}
  let selectWithArrowPosition = -1
  let selectionMode = 'keyboard'

  export let sortBy = ''
  export let sortDirection: TableSortBy = ''
  export let fields: TableField[] = []
  export let data: TableDataRow[] = []
  export let getActions: TableActionProp = undefined
  export let groupLabel: TableGroupLabelProp = undefined
  export let disableRowClick = false
  export let hideCounter = false
  export let selectable = false
  export let selectedRows: TableDataRow[] = []
  export let selectedTrackedBy = 'id'
  export let hideSelectAll = false
  export let disableKeyboardNavigation = false

  $: groupedData = groupData(data)
  $: addExtraCell = getActions instanceof Function
  $: indeterminate = selectedRows.length > 0 && selectedRows.length < data.length
  $: allChecked = selectedRows.length === data.length
  $: flattedData = groupedData.flatMap((d) => d.rows)
  $: lastSelectedIndex = flattedData.findIndex(
    (d) => d[selectedTrackedBy] === lastSelected[selectedTrackedBy]
  )

  function groupData(rows: TableDataRow[]): TableGroup[] {
    if (rows.length === 0) return []

    const groups: TableGroup[] = []

    rows.forEach((row) => {
      const rowLabel = groupLabel instanceof Function ? groupLabel(row) : ''
      const groupExist = groups.find((g) => g.label === rowLabel)

      if (groupExist) {
        groupExist.rows.push(row)
      } else {
        groups.push({ label: rowLabel, rows: [row] })
      }
    })

    return groups
  }

  function toggleAllSelected(selected: boolean) {
    selectedRows = []
    lastSelected = {}

    dispatch('selectAll', selected)

    if (!selected) return

    selectedRows = data
  }

  function selectRow(row: TableDataRow) {
    lastSelectedForShift = row
    selectedRows = [...new Set([...selectedRows, row])]
  }

  function unselectRow(row: TableDataRow) {
    selectedRows = selectedRows.filter((r) => r[selectedTrackedBy] !== row[selectedTrackedBy])
    if (!selectedRows.length) {
      lastSelected = {}
    }
  }

  function rowIsSelected(row: TableDataRow) {
    return selectedRows.find((r) => r[selectedTrackedBy] === row[selectedTrackedBy])
  }

  function toggleRow(row: TableDataRow) {
    if (rowIsSelected(row)) {
      unselectRow(row)
    } else {
      selectRow(row)
    }
  }

  function selectRange(to: TableDataRow) {
    if (lastSelectedIndex < 0) return

    let fromIndex = flattedData.findIndex(
      (d) => d[selectedTrackedBy] === lastSelectedForShift[selectedTrackedBy]
    )
    let toIndex = flattedData.findIndex((d) => d[selectedTrackedBy] === to[selectedTrackedBy])
    if (fromIndex > toIndex) {
      ;[fromIndex, toIndex] = [toIndex, fromIndex]
    }

    const itemsToSelect = flattedData.slice(fromIndex, toIndex + 1)

    selectedRows = [...new Set([...selectedRows, ...itemsToSelect])]
  }

  function handleKeydown(event: KeyboardEvent) {
    if (disableKeyboardNavigation) return

    // If any input is focused on the rest of the window we dont want to break the default behavior
    if (isInputFocused()) {
      return
    }

    selectionMode = 'keyboard'

    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault()
      selectedRows = []
      lastSelected = {}
    }

    if ((event.code === 'Space' || event.key === ' ') && lastSelectedIndex >= 0) {
      event.preventDefault()
      toggleRow(lastSelected)
    }

    metaKeyPressed = event.metaKey
    shiftKeyPressed = event.shiftKey

    if (event.key === 'Enter') {
      if (lastSelectedIndex >= 0) {
        event.preventDefault()
        dispatch('rowClick', lastSelected)
      }
      return
    }

    if (event.key === 'Shift') {
      event.preventDefault()
      selectWithArrowPosition = lastSelectedIndex
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const toIndex = lastSelectedIndex - 1
      const to = flattedData[toIndex]

      if (!to) return

      if (!shiftKeyPressed) {
        lastSelected = to
        return
      }

      if (!rowIsSelected(lastSelected)) {
        selectRow(lastSelected)
      }

      if (toIndex < selectWithArrowPosition) {
        selectRow(to)
      } else {
        unselectRow(lastSelected)
      }
      lastSelected = to
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (lastSelectedIndex < 0) {
        if (shiftKeyPressed) {
          selectRow(flattedData[0])
        }
        lastSelected = flattedData[0]
        return
      }

      const toIndex = lastSelectedIndex + 1
      const to = flattedData[toIndex]

      if (!to) return

      if (!shiftKeyPressed) {
        lastSelected = to
        return
      }

      if (!rowIsSelected(lastSelected)) {
        selectRow(lastSelected)
      }

      if (toIndex > selectWithArrowPosition) {
        selectRow(to)
      } else {
        unselectRow(lastSelected)
      }
      lastSelected = to
    }
  }
</script>

<svelte:window
  on:mousemove={() => {
    selectionMode = 'mouse'
  }}
  on:keydown={handleKeydown}
  on:keyup={(event) => {
    metaKeyPressed = false
    shiftKeyPressed = false

    if (!event.shiftKey) {
      selectWithArrowPosition = -1
    }
  }}
/>

<div class="w-full font-sans border rounded-md border-neutral-100">
  <Table class="hidden md:table" {...$$restProps}>
    <colgroup>
      {#if selectable}
        <col style="width: 38px" />
      {/if}
      {#each fields as field, i (i)}
        <col style={field.style} />
      {/each}
      {#if addExtraCell}
        <col style="width: 38px" />
      {/if}
    </colgroup>
    <TableHeader>
      <TableRow>
        {#if selectable}
          <!-- if table is selectable we need to add an extra header with a checkbox -->
          <TableHead class="bg-white sticky top-0 z-10 p-0 h-9">
            {#if !hideSelectAll}
              <BaseTableCheckbox
                hidden={!selectedRows.length}
                {indeterminate}
                checked={allChecked}
                on:checked={() => {
                  toggleAllSelected(!selectedRows.length)
                }}
              />
            {/if}
          </TableHead>
        {/if}
        {#each fields as field, i (i)}
          <TableHead
            class="bg-white group sticky z-10 top-0 py-0 {i === 0 && !selectable
              ? 'pl-3'
              : 'pl-0'} {i === fields.length - 1 && !addExtraCell ? 'pr-3' : 'pr-0'}"
          >
            <BaseTableHeaderContent {sortBy} {sortDirection} {field} on:orderBy />
          </TableHead>
        {/each}
        {#if addExtraCell}
          <!-- if table has actions cell we need to add an extra header -->
          <th scope="col" class="bg-white sticky top-0 z-10 rounded-tr-md">
            <div class="border-b border-neutral-100 h-9" />
          </th>
        {/if}
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each groupedData as group, i (i)}
        {#if group.label}
          <tr>
            <th
              scope="colgroup"
              colspan={fields.length + (selectable ? 2 : 1)}
              class="bg-white text-left text-sm font-medium text-neutral-500 sticky top-9 tracking-normal h-8 z-10"
            >
              <span
                class:border-t={i > 0}
                class:pl-12={selectable}
                class:pl-3={!selectable}
                class="flex items-center space-x-1 box-border border-b border-neutral-100 h-8"
              >
                <span>{group.label}</span>
                {#if !hideCounter}
                  <BaseCounter content={group.rows.length} />
                {/if}
              </span>
            </th>
          </tr>
        {/if}
        {#each group.rows as row}
          <BaseTableRow
            {row}
            {fields}
            {getActions}
            {disableRowClick}
            {selectable}
            {selectedRows}
            {selectedTrackedBy}
            {selectionMode}
            selected={selectable &&
              lastSelected &&
              row[selectedTrackedBy] === lastSelected[selectedTrackedBy]}
            on:click={() => {
              if (disableRowClick) return

              if (metaKeyPressed) {
                dispatch('rowNewTabClick', row)
              } else {
                dispatch('rowClick', row)
              }
            }}
            on:contextmenu={() => {
              dispatch('rowRightClick', row)
            }}
            on:checked={(event) => {
              if (event.detail) {
                if (shiftKeyPressed) {
                  selectRange(row)
                } else {
                  selectRow(row)
                }
                lastSelected = row
              } else {
                unselectRow(row)
              }
            }}
            on:hover={() => {
              if (shiftKeyPressed) return
              lastSelected = row
            }}
            on:action
            on:copied
          />
        {/each}
      {/each}
    </TableBody>
  </Table>
  <div class="md:hidden space-y-3">
    {#each groupedData as group}
      {#each group.rows as row}
        <button
          class:cursor-default={disableRowClick}
          class="w-full text-left border border-neutral-200 rounded"
          on:click={() => {
            if (disableRowClick) return

            if (metaKeyPressed) {
              dispatch('rowNewTabClick', row)
            } else {
              dispatch('rowClick', row)
            }
          }}
        >
          {#each fields as field, i (i)}
            <div class="text-base tracking-normal py-2">
              <BaseTableCellContent
                {field}
                badge={field.helperBadge ? field.helperBadge(row) : null}
                status={field.helperStatus ? field.helperStatus(row) : null}
                data={field.formatter ? field.formatter(row) : row[field.slug] || ''}
                on:copied
              />
            </div>
          {/each}
        </button>
      {/each}
    {/each}
  </div>
  <div use:intersect={intersectOptions} />
</div>
