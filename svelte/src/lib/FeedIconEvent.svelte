<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { FeedIconEventProps } from './types.js'

  let { icon = undefined, iconTheme = 'default' }: FeedIconEventProps = $props()
</script>

<div class="relative py-0.5 mt-2">
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="size-4 text-icon-default-bold" />
  {/if}
</div>
