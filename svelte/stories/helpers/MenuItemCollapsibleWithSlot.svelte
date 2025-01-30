<script lang="ts">
  import MenuItemCollapsible from '$lib/MenuItemCollapsible.svelte'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { Question } from '@invopop/ui-icons'

  export let title = ''
  export let collapsed = false
  export let icon: IconSource | undefined = undefined
</script>

<MenuItemCollapsible {title} {collapsed} {icon}>
  <Icon src={Question} class="h-4 w-4 text-white-40 mt-px" />
</MenuItemCollapsible>
