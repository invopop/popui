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
  import BaseTableHeader from './BaseTableHeader.svelte'
  import { createEventDispatcher } from 'svelte'
  import BaseCounter from './BaseCounter.svelte'
  import BaseTableRow from './BaseTableRow.svelte'
  import BaseTableCell from './BaseTableCell.svelte'
  import InputCheckbox from './InputCheckbox.svelte'

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
  export let freeWrap = false
  export let selectable = false
  export let selectedRows: TableDataRow[] = []
  export let selectedTrackedBy = 'id'
  export let hideSelectAll = false

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

    if (!selected) return

    selectedRows = data
  }

  function selectRow(row: TableDataRow) {
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

    let fromIndex = lastSelectedIndex
    let toIndex = flattedData.findIndex((d) => d[selectedTrackedBy] === to[selectedTrackedBy])
    if (fromIndex > toIndex) {
      ;[fromIndex, toIndex] = [toIndex, fromIndex]
    }

    const itemsToSelect = flattedData.slice(fromIndex, toIndex + 1)

    selectedRows = [...new Set([...selectedRows, ...itemsToSelect])]
  }
</script>

<svelte:window
  on:mousemove={() => {
    selectionMode = 'mouse'
  }}
  on:keydown={(event) => {
    event.preventDefault()

    selectionMode = 'keyboard'

    if (event.key === 'Escape' || event.key === 'Esc') {
      selectedRows = []
      lastSelected = {}
    }

    if ((event.code === 'Space' || event.key === ' ') && lastSelectedIndex >= 0) {
      toggleRow(lastSelected)
    }

    metaKeyPressed = event.metaKey
    shiftKeyPressed = event.shiftKey

    if (event.key === 'Enter') {
      if (lastSelectedIndex >= 0) {
        dispatch('rowClick', lastSelected)
      }
      return
    }

    if (event.key === 'Shift') {
      selectWithArrowPosition = lastSelectedIndex
      return
    }

    if (event.key === 'ArrowUp') {
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
  }}
  on:keyup={(event) => {
    metaKeyPressed = false
    shiftKeyPressed = false

    if (!event.shiftKey) {
      selectWithArrowPosition = -1
    }
  }}
/>

<div class="w-full font-sans">
  <table class="hidden md:table w-full">
    <thead>
      <tr class="border-b border-neutral-100 relative">
        {#if selectable}
          <!-- if table is selectable we need to add an extra header with a checkbox -->
          <th scope="col" class="bg-white sticky top-0 z-10 rounded-tr-md">
            {#if !hideSelectAll}
              <button
                class="pl-5 pr-3 h-[40px] flex items-center outline-none group cursor-default"
                on:click|stopPropagation={() => {
                  toggleAllSelected(!selectedRows.length)
                }}
              >
                <div class:invisible={!selectedRows.length} class="group-hover:visible">
                  <InputCheckbox
                    checked={allChecked}
                    {indeterminate}
                    on:change={(event) => {
                      toggleAllSelected(event.detail)
                    }}
                  />
                </div>
              </button>
            {/if}
          </th>
        {/if}
        {#each fields as field, i (i)}
          <BaseTableHeader
            isFirst={i === 0 && !selectable}
            isLast={!addExtraCell && i === fields.length - 1}
            {sortBy}
            {sortDirection}
            {field}
            on:orderBy
          />
        {/each}
        {#if addExtraCell}
          <!-- if table has actions cell we need to add an extra header -->
          <th scope="col" class="bg-white sticky top-0 z-10 rounded-tr-md" />
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each groupedData as group}
        {#if group.label}
          <tr>
            <th
              scope="colgroup"
              colspan={fields.length + (selectable ? 2 : 1)}
              class="bg-neutral-50 px-5 text-left text-sm font-medium text-neutral-500 sticky top-11 tracking-normal border-t border-b border-neutral-100 h-8"
            >
              <span>{group.label}</span>
              {#if !hideCounter}
                <BaseCounter content={group.rows.length} />
              {/if}
            </th>
          </tr>
        {/if}
        {#each group.rows as row}
          <BaseTableRow
            {row}
            {fields}
            {getActions}
            {disableRowClick}
            {freeWrap}
            {selectable}
            {selectedRows}
            {selectedTrackedBy}
            {selectionMode}
            selected={lastSelected && row[selectedTrackedBy] === lastSelected[selectedTrackedBy]}
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
    </tbody>
  </table>
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
            <BaseTableCell
              tag="div"
              {field}
              badge={field.helperBadge ? field.helperBadge(row) : null}
              status={field.helperStatus ? field.helperStatus(row) : null}
              data={field.formatter ? field.formatter(row) : row[field.slug] || ''}
              on:copied
            />
          {/each}
        </button>
      {/each}
    {/each}
  </div>
  <div use:intersect={intersectOptions} />
</div>
