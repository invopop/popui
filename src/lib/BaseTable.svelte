<script lang="ts">
  import type { TableActionProp, TableDataRow, TableField } from './types.js'
  import BaseTableHeader from './BaseTableHeader.svelte'
  import BaseTableActions from './BaseTableActions.svelte'
  import { createEventDispatcher } from 'svelte'
  import BaseTableCell from './BaseTableCell.svelte'

  const dispatch = createEventDispatcher()

  export let fields: TableField[] = []
  export let data: TableDataRow[] = []
  export let getActions: TableActionProp = undefined
</script>

<div class="w-full rounded border border-neutral-50 font-sans">
  <table>
    <thead>
      <tr class="border-b border-neutral-50">
        {#each fields as field, i (i)}
          <BaseTableHeader {field} totalFields={fields.length} currentIndex={i} on:orderBy />
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as row}
        {@const actions = getActions instanceof Function ? getActions(row) : []}
        <tr class="hover:bg-neutral-100 rounded">
          {#each fields as field, i (i)}
            <BaseTableCell
              currentIndex={i}
              {field}
              totalActions={actions.length}
              totalFields={fields.length}
              badge={field.helperBadge ? field.helperBadge(row) : null}
              on:click={() => {
                dispatch('rowClick', row)
              }}>{row[field.slug]}</BaseTableCell
            >
          {/each}
          {#if actions.length}
            <td class="pl-3 pr-4">
              <BaseTableActions
                {actions}
                on:click={(event) => {
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
