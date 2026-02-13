<script lang="ts">
  import { SortAscending, SortDescending, Preview, Filter, Lock } from '@invopop/ui-icons'
  import type { TableSortBy, DrawerOption, BaseTableHeaderOrderByProps } from './types.js'
  import DrawerContext from './DrawerContext.svelte'

  let { isActive = false, sortDirection, onOrderBy, onHide, onFilter, onFreeze, isFrozen = false, showSortOptions = true, showFilterOption = true, showHideOption = true }: BaseTableHeaderOrderByProps = $props()

  let items = $derived([
    ...(showSortOptions ? [
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
      { label: '', value: 'sep-1', separator: true }
    ] : []),
    ...(showFilterOption ? [
      { icon: Filter, label: 'Filter by column', value: 'filter' },
      { label: '', value: 'sep-2', separator: true }
    ] : []),
    { icon: Lock, label: isFrozen ? 'Unfreeze column' : 'Freeze column', value: 'freeze' },
    ...(showHideOption ? [
      { label: '', value: 'sep-3', separator: true },
      { icon: Preview, label: 'Hide column', value: 'hide' }
    ] : [])
  ] as DrawerOption[])
</script>

<DrawerContext
  {items}
  onclick={(e) => {
    if (e === 'hide') {
      onHide?.()
    } else if (e === 'filter') {
      onFilter?.()
    } else if (e === 'freeze') {
      onFreeze?.()
    } else {
      onOrderBy?.(e as TableSortBy)
    }
  }}
/>
