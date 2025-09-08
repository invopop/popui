<script lang="ts">
  import clsx from 'clsx'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import type { StatusLabelProps } from './types.js'

  let { status, label = '' }: StatusLabelProps = $props()

  let styles = $derived(
    clsx({
      'text-positive-500': status === 'success',
      'text-neutral-500': status === 'queued',
      'text-warning-500': status === 'alert',
      'text-danger-500': status === 'failure',
      'text-yellow-500': status === 'run'
    })
  )
</script>

<div class="flex items-center space-x-1">
  <span class="{styles} text-base font-inter font-medium">{label}</span>
  {#if status}
    <FeedIconStatus {status} />
  {/if}
</div>
