<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { FeedIconEventProps } from './types.js'

  let { icon = undefined, iconTheme = 'default' }: FeedIconEventProps = $props()
</script>

<div class="relative py-0.5 mt-2">
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="h-4 w-4 text-neutral-500" />
  {/if}
</div>
