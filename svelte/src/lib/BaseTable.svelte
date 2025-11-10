<script lang="ts">
  import { intersect } from 'svelte-intersection-observer-action'
  import type { BaseTableProps, TableDataRow, TableGroup } from './types.js'
  import BaseCounter from './BaseCounter.svelte'
  import BaseTableRow from './BaseTableRow.svelte'
  import { isInputFocused } from './helpers.js'
  import BaseTableCellContent from './BaseTableCellContent.svelte'
  import { Table, TableHead, TableHeader, TableRow } from './table/index.js'
  import BaseTableCheckbox from './BaseTableCheckbox.svelte'
  import BaseTableHeaderContent from './BaseTableHeaderContent.svelte'
  import TableBody from './table/table-body.svelte'

  const callback = (entry: IntersectionObserverEntry) => {
    if (entry.intersectionRatio && entry.isIntersecting) {
      ontableEndReached?.()
    }
  }
  const intersectOptions = { callback }

  let metaKeyPressed = $state(false)
  let shiftKeyPressed = $state(false)
  let lastSelected: TableDataRow = $state({})
  let lastSelectedForShift: TableDataRow = {}
  let selectWithArrowPosition = $state(-1)
  let selectionMode = $state('keyboard')

  let {
    sortBy = '',
    sortDirection = $bindable(''),
    fields = [],
    data = [],
    getActions = undefined,
    groupLabel = undefined,
    disableRowClick = false,
    hideCounter = false,
    selectable = false,
    selectedRows = $bindable([]),
    selectedTrackedBy = 'id',
    hideSelectAll = false,
    disableKeyboardNavigation = false,
    ontableEndReached,
    onSelectAllRows,
    onRowClick,
    onRowNewTabClick,
    onRowRightClick,
    onCopied,
    onOrderBy,
    onClickAction,
    ...rest
  }: BaseTableProps = $props()

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

    onSelectAllRows?.(selected)

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

    // Only set keyboard mode if it's not just the Shift key alone
    if (event.key !== 'Shift') {
      selectionMode = 'keyboard'
    }

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
        onRowClick?.(lastSelected)
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
  let groupedData = $derived(groupData(data))
  let addExtraCell = $derived(getActions instanceof Function)
  let indeterminate = $derived(selectedRows.length > 0 && selectedRows.length < data.length)
  let allChecked = $derived(selectedRows.length === data.length)
  let flattedData = $derived(groupedData.flatMap((d) => d.rows))
  let lastSelectedIndex = $derived(
    flattedData.findIndex((d) => d[selectedTrackedBy] === lastSelected[selectedTrackedBy])
  )
</script>

<svelte:window
  onmousemove={() => {
    selectionMode = 'mouse'
  }}
  onkeydown={handleKeydown}
  onkeyup={(event) => {
    metaKeyPressed = false
    shiftKeyPressed = false

    if (!event.shiftKey) {
      selectWithArrowPosition = -1
    }
  }}
/>

<div class="h-full w-full font-sans border rounded-md border-border overflow-auto">
  <Table class="hidden md:table" {...rest}>
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
                onChecked={() => {
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
            <BaseTableHeaderContent {sortBy} {sortDirection} {field} {onOrderBy} />
          </TableHead>
        {/each}
        {#if addExtraCell}
          <!-- if table has actions cell we need to add an extra header -->
          <th scope="col" class="bg-white sticky top-0 z-10 rounded-tr-md"> </th>
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
              class="bg-white text-left text-sm font-medium text-foreground-default-secondary sticky top-9 tracking-normal h-8 z-10"
            >
              <span
                class:border-t={i > 0}
                class:pl-12={selectable}
                class:pl-3={!selectable}
                class="flex items-center space-x-1 box-border border-b border-border h-8"
              >
                <span>{group.label}</span>
                {#if !hideCounter}
                  <BaseCounter value={group.rows.length} />
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
            onclick={() => {
              if (disableRowClick) return

              if (metaKeyPressed) {
                onRowNewTabClick?.(row)
              } else {
                onRowClick?.(row)
              }
            }}
            oncontextmenu={() => {
              onRowRightClick?.(row)
            }}
            onChecked={(checked) => {
              if (checked) {
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
            onmouseover={() => {
              if (shiftKeyPressed) return
              lastSelected = row
            }}
            {onClickAction}
            {onCopied}
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
          class="w-full text-left border border-neutral-20 rounded"
          onclick={() => {
            if (disableRowClick) return

            if (metaKeyPressed) {
              onRowNewTabClick?.(row)
            } else {
              onRowClick?.(row)
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
                {onCopied}
              />
            </div>
          {/each}
        </button>
      {/each}
    {/each}
  </div>
  <div use:intersect={intersectOptions}></div>
</div>
