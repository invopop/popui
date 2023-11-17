<script lang="ts">
  import type {
    TableActionProp,
    TableDataRow,
    TableField,
    TableGroup,
    TableGroupLabelProp
  } from './types.js'
  import BaseTableHeader from './BaseTableHeader.svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import { createEventDispatcher } from 'svelte'
  import BaseTableCell from './BaseTableCell.svelte'
  import BaseCounter from './BaseCounter.svelte'

  const dispatch = createEventDispatcher()

  export let sortBy = ''
  export let sortDirection = ''
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

<div class="w-full rounded border border-neutral-100 font-sans">
  <table class="w-full">
    <thead>
      <tr class="border-b border-neutral-100">
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
              class="bg-neutral-50 px-4 py-2.5 text-left text-sm font-medium text-neutral-500 sticky top-9 z-10"
            >
              <span>{group.label}</span>
              <BaseCounter content={group.rows.length} />
            </th>
          </tr>
        {/if}
        {#each group.rows as row}
          {@const actions = getActions instanceof Function ? getActions(row) : []}
          <tr
            class="hover:bg-neutral-100 rounded hover:cursor-pointer"
            on:click={() => {
              dispatch('rowClick', row)
            }}
          >
            {#each fields as field, i (i)}
              <BaseTableCell
                currentIndex={i}
                {field}
                totalActions={actions.length}
                totalFields={fields.length}
                badge={field.helperBadge ? field.helperBadge(row) : null}
                data={field.formatter ? field.formatter(row) : row[field.slug]}
              />
            {/each}
            {#if actions.length}
              <td class="pl-3 pr-4">
                <BaseTableActions
                  {actions}
                  on:clickAction={(event) => {
                    dispatch('action', { row, action: event.detail })
                  }}
                />
              </td>
            {/if}
          </tr>
        {/each}
      {/each}
    </tbody>
  </table>
</div>
