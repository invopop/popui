<script lang="ts">
  import MenuItemCollapsible from '$lib/MenuItemCollapsible.svelte'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { Question } from '@invopop/ui-icons'

  interface Props {
    title?: string;
    collapsed?: boolean;
    icon?: IconSource | undefined;
  }

  let { title = '', collapsed = false, icon = undefined }: Props = $props();
</script>

<MenuItemCollapsible {title} {collapsed} {icon}>
  <Icon src={Question} class="h-4 w-4 text-white-40 mt-px" />
</MenuItemCollapsible>
