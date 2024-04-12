<script lang="ts">
  import { SortAscending, SortDescending } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'
  import type { TableSortBy, DrawerOption } from './types.js'
  import DrawerContext from './DrawerContext.svelte'

  const dispatch = createEventDispatcher()

  export let isActive = false
  export let sortDirection: TableSortBy

  $: items = [
    { icon: SortAscending, label: 'Sort Ascending', value: 'asc' },
    { icon: SortDescending, label: 'Sort Descending', value: 'desc' }
  ].map((o) => ({
    ...o,
    selected: isActive && sortDirection === o.value
  })) as DrawerOption[]
</script>

<DrawerContext
  {items}
  on:click={(e) => {
    dispatch('sortBy', e.detail)
  }}
/>
