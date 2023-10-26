<script lang="ts">
  import MenuItem from '../../lib/MenuItem.svelte'
  import type { MenuItemProps } from '../../lib/types.ts'

  export let collapsable = false
  export let open = false
  export let children: MenuItemProps[]
</script>

<div>
  <MenuItem label="Parent Item" {collapsable} {open} {children} />
</div>
