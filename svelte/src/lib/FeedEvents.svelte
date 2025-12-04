<script lang="ts">
  import SeparatorHorizontal from './SeparatorHorizontal.svelte'
  import TagStatus from './TagStatus.svelte'
  import type { FeedEventsProps } from './types.js'

  let { events = [] }: FeedEventsProps = $props()
</script>

<div class="border border-border bg-background-default-secondary rounded">
  {#each events as event, i (i)}
    {#if i > 0}
      <SeparatorHorizontal />
    {/if}
    <div class="py-2 px-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <TagStatus status={event.status.type} label={event.status.label} />
          {#if event.code}
            <p class="text-sm text-foreground-default-secondary font-mono">
              {event.code}
            </p>
          {/if}
        </div>
        <p class="text-sm text-foreground-default-secondary font-mono">
          {event.date.toISOString()}
        </p>
      </div>
      {#if event.message}
        <p class="text-foreground text-sm pt-2 break-words">{event.message}</p>
      {/if}
    </div>
  {/each}
</div>
