<script lang="ts">
  import clsx from 'clsx'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import type { FeedItemStatus } from './types.js'

  export let status: FeedItemStatus
  export let label = ''

  $: styles = clsx({
    'text-positive-600': status === 'success',
    'text-neutral-400': status === 'queued',
    'text-warning-600': status === 'alert',
    'text-danger-600': status === 'failure',
    'text-yellow-600': status === 'run'
  })
</script>

<div class="flex items-center space-x-1">
  <span class="{styles} text-base font-inter font-medium">{label}</span>
  {#if status}
    <FeedIconStatus {status} />
  {/if}
</div>
