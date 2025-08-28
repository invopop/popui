<script lang="ts">
  import TagStatus from './TagStatus.svelte'
  import type { FeedEvent } from './types.js'

  interface Props {
    events?: FeedEvent[];
  }

  let { events = [] }: Props = $props();
</script>

<div class="border border-neutral-100 bg-neutral-50 rounded">
  {#each events as event, i (i)}
    <div class:border-t={i > 0} class="border-neutral-100 py-2 px-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <TagStatus status={event.status.type} label={event.status.label} />
          {#if event.code}
            <p class="text-sm text-neutral-500 font-mono tracking-wide">
              {event.code}
            </p>
          {/if}
        </div>
        <p class="text-sm text-neutral-500 font-mono tracking-wide">
          {event.date.toISOString()}
        </p>
      </div>
      {#if event.message}
        <p class="text-neutral-800 text-sm pt-2 tracking-normal break-words">{event.message}</p>
      {/if}
    </div>
  {/each}
</div>
