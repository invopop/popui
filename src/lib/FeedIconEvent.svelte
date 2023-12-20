<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import type { IconTheme } from './types.js'
  import FeedIconStatus from './FeedIconStatus.svelte'

  export let status: 'success' | 'failure' | '' = ''
  export let icon: IconSource | undefined = undefined
  export let iconTheme: IconTheme = 'default'
</script>

<div
  class="relative w-8 h-8 rounded border border-neutral-100 flex items-center justify-center text-neutral-800 bg-white"
>
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="h-5 w-5 text-neutral-800" />
  {/if}
  {#if status}
    <span class="absolute bottom-0 right-0 -mb-1 -mr-1 w-4 h-4">
      <FeedIconStatus {status} />
    </span>
  {/if}
</div>
