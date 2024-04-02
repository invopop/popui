<script lang="ts">
  import TagStatus from './TagStatus.svelte'
  import type { FeedEvent } from './types.js'

  export let events: FeedEvent[] = []

  function formatDate(date: Date) {
    return date.toISOString()
  }
</script>

<div class="border border-neutral-100 bg-neutral-50 rounded">
  {#each events as event, i (i)}
    <div class:border-t={i > 0} class="border-neutral-100 py-2 px-3">
      <div class="flex items-center justify-between">
        <TagStatus status={event.status.type} label={event.status.label} />
        <p class="text-xs text-neutral-500 tabular-nums slashed-zero tracking-wide">
          {formatDate(event.date)}
        </p>
      </div>
      {#if event.message}
        <p class="text-neutral-800 text-sm mt-2 tracking-normal">{event.message}</p>
      {/if}
    </div>
  {/each}
</div>
