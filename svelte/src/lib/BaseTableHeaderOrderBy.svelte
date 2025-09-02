<script lang="ts">
  import { SortAscending, SortDescending } from '@invopop/ui-icons'
  import type { TableSortBy, DrawerOption, BaseTableHeaderOrderByProps } from './types.js'
  import DrawerContext from './DrawerContext.svelte'

  let { isActive = false, sortDirection, onOrderBy }: BaseTableHeaderOrderByProps = $props()

  let items = $derived(
    [
      { icon: SortAscending, label: 'Sort Ascending', value: 'asc' },
      { icon: SortDescending, label: 'Sort Descending', value: 'desc' }
    ].map((o) => ({
      ...o,
      selected: isActive && sortDirection === o.value
    })) as DrawerOption[]
  )
</script>

<DrawerContext
  {items}
  onclick={(e) => {
    onOrderBy?.(e as TableSortBy)
  }}
/>
