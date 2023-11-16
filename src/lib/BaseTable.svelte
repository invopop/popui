<script lang="ts">
  import type { TableActionProp, TableDataRow, TableField } from './types.js'
  import BaseTableHeader from './BaseTableHeader.svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import { createEventDispatcher } from 'svelte'
  import BaseTableCell from './BaseTableCell.svelte'

  const dispatch = createEventDispatcher()

  export let sortBy = ''
  export let sortDirection = ''
  export let fields: TableField[] = []
  export let data: TableDataRow[] = []
  export let getActions: TableActionProp = undefined
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
          <tr class="bg-white" />
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
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
    </tbody>
  </table>
</div>
