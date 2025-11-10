<script lang="ts">
  import clsx from 'clsx'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import type { StatusLabelProps } from './types.js'

  let { status, label = '' }: StatusLabelProps = $props()

  let styles = $derived(
    clsx({
      'text-foreground-success': status === 'success',
      'text-foreground-critical': status === 'failure',
      'text-foreground-attention': ['run', 'alert'].includes(status),
      'text-foreground-default-secondary': status === 'queued'
    })
  )
</script>

<div class="flex items-center space-x-1">
  <span class="{styles} text-base font-inter font-medium">{label}</span>
  {#if status}
    <FeedIconStatus {status} />
  {/if}
</div>
