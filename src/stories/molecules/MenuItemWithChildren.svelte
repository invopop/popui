<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import MenuItem from '../../lib/MenuItem.svelte'
  import type { MenuItemProps } from '../../lib/types.ts'

  export let collapsable = false
  export let collapsedSidebar = false
  export let open = false
  export let active = false
  export let children: MenuItemProps[]
  export let icon: IconSource | undefined = undefined
  export let url = ''
</script>

<div>
  <MenuItem
    label="Parent Item"
    {icon}
    {active}
    {collapsable}
    {collapsedSidebar}
    {open}
    {children}
    {url}
  />
</div>
