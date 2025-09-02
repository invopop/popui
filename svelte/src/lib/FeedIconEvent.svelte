<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import type { IconTheme } from './types.js'

  interface Props {
    icon?: IconSource | undefined;
    iconTheme?: IconTheme;
  }

  let { icon = undefined, iconTheme = 'default' }: Props = $props();
</script>

<div class="relative py-0.5 mt-2">
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="h-4 w-4 text-neutral-500" />
  {/if}
</div>
