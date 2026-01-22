<script lang="ts">
  import { SortAscending, SortDescending, Preview } from '@invopop/ui-icons'
  import type { TableSortBy, DrawerOption, BaseTableHeaderOrderByProps } from './types.js'
  import DrawerContext from './DrawerContext.svelte'

  let { isActive = false, sortDirection, onOrderBy, onHide }: BaseTableHeaderOrderByProps = $props()

  let items = $derived([
    {
      icon: SortAscending,
      label: 'Sort Ascending',
      value: 'asc',
      selected: isActive && sortDirection === 'asc'
    },
    {
      icon: SortDescending,
      label: 'Sort Descending',
      value: 'desc',
      selected: isActive && sortDirection === 'desc'
    },
    { label: '', value: '', separator: true },
    { icon: Preview, label: 'Hide', value: 'hide' }
  ] as DrawerOption[])
</script>

<DrawerContext
  {items}
  onclick={(e) => {
    if (e === 'hide') {
      onHide?.()
    } else {
      onOrderBy?.(e as TableSortBy)
    }
  }}
/>
