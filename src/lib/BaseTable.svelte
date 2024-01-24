<script lang="ts">
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

  const dispatch = createEventDispatcher()

  let metaKeyPressed = false

  export let sortBy = ''
  export let sortDirection: TableSortBy = ''
  export let fields: TableField[] = []
  export let data: TableDataRow[] = []
  export let getActions: TableActionProp = undefined
  export let groupLabel: TableGroupLabelProp = undefined

  $: groupedData = groupData(data)

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
</script>

<svelte:window
  on:keydown={(event) => {
    metaKeyPressed = event.metaKey
  }}
  on:keyup={() => {
    metaKeyPressed = false
  }}
/>

<div class="w-full rounded border border-neutral-100 font-sans">
  <table class="w-full">
    <thead>
      <tr class="border-b border-neutral-100 relative">
        {#each fields as field, i (i)}
          <BaseTableHeader
            {sortBy}
            {sortDirection}
            {field}
            totalFields={fields.length}
            currentIndex={i}
            on:orderBy
          />
        {/each}
        {#if getActions instanceof Function}
          <!-- if table has actions cell we need to add an extra header -->
          <th scope="col" class="bg-white sticky top-0 z-10" />
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
              class="bg-neutral-50 px-4 py-2.5 text-left text-sm font-medium text-neutral-500 sticky top-9"
            >
              <span>{group.label}</span>
              <BaseCounter content={group.rows.length} />
            </th>
          </tr>
        {/if}
        {#each group.rows as row}
          <BaseTableRow
            {row}
            {fields}
            {getActions}
            on:click={() => {
              if (metaKeyPressed) {
                dispatch('rowNewTabClick', row)
              } else {
                dispatch('rowClick', row)
              }
            }}
            on:contextmenu={() => {
              dispatch('rowRightClick', row)
            }}
            on:action
          />
        {/each}
      {/each}
    </tbody>
  </table>
  <slot name="bottom" />
</div>
