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

  $: groupedData = groupData(data)
  $: addExtraCell = getActions instanceof Function
  $: indeterminate = selectedRows.length > 0 && selectedRows.length < data.length
  $: allChecked = selectedRows.length === data.length

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

    if (!selected) return

    selectedRows = data
  }
</script>

<svelte:window
  on:keydown={(event) => {
    metaKeyPressed = event.metaKey
  }}
  on:keyup={() => {
    metaKeyPressed = false
  }}
/>

<div class="w-full rounded-md md:border border-neutral-100 font-sans">
  <table class="hidden md:table w-full rounded-md">
    <thead>
      <tr class="border-b border-neutral-100 relative">
        {#if selectable}
          <!-- if table is selectable we need to add an extra header with a checkbox -->
          <th scope="col" class="bg-white sticky top-0 z-10 rounded-tr-md pl-1.5">
            <InputCheckbox
              checked={allChecked}
              {indeterminate}
              on:change={(event) => {
                toggleAllSelected(event.detail)
              }}
            />
          </th>
        {/if}
        {#each fields as field, i (i)}
          <BaseTableHeader
            isFirst={i === 0}
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
              colspan={fields.length + 1}
              class="bg-neutral-50 px-3 py-1.5 text-left text-sm font-medium text-neutral-500 sticky top-11 tracking-normal border-t border-b border-neutral-100 h-8"
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
                selectedRows = [...selectedRows, row]
              } else {
                selectedRows = selectedRows.filter(
                  (r) => r[selectedTrackedBy] !== row[selectedTrackedBy]
                )
              }
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
              currentIndex={i}
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
