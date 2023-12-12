<script lang="ts">
  import { ArrowDown, ArrowUp } from '@steeze-ui/heroicons'
  import { createEventDispatcher } from 'svelte'
  import type { TableSortBy, DrawerOption } from './types.js'
  import DrawerContext from './DrawerContext.svelte'

  const dispatch = createEventDispatcher()

  export let isActive = false
  export let sortDirection: TableSortBy

  $: items = [
    { icon: ArrowUp, label: 'Sort Ascending', value: 'asc' },
    { icon: ArrowDown, label: 'Sort Descending', value: 'desc' }
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
