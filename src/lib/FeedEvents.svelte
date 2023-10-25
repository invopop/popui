<script lang="ts">
  import TagStatus from './TagStatus.svelte'
  import type { FeedEvent } from './types.js'

  export let events: FeedEvent[] = []

  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }

  function formatDate(date: Date) {
    const formattedDate = date.toLocaleDateString('en-US', dateOptions)
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions)

    return `${formattedDate} at ${formattedTime}`
  }
</script>

<div class="border border-neutral-100 bg-neutral-50 rounded-2xl">
  {#each events as event, i (i)}
    <div class:border-t={i > 0} class="border-neutral-100 py-2 px-3">
      <div class="flex items-center justify-between">
        <TagStatus status={event.status.type} label={event.status.label} />
        <p class="text-xs text-neutral-500">{formatDate(event.date)}</p>
      </div>
      {#if event.message}
        <p class="text-neutral-800 text-sm mt-2">{event.message}</p>
      {/if}
    </div>
  {/each}
</div>
