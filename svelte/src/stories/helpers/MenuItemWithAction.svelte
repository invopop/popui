<script lang="ts">
  import MenuItem from '$lib/MenuItem.svelte'
  import BaseButton from '$lib/BaseButton.svelte'
  import type { MenuItemProps } from '$lib/types.js'
  import { Pin } from '@invopop/ui-icons'

  let props: MenuItemProps = $props()
</script>

<MenuItem {...props}>
  {#snippet action()}
    <BaseButton variant="dark-ghost" size="sm" icon={Pin} title="Pin" />
  {/snippet}
</MenuItem>
