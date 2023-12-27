<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import type { FeedItemStatus, FeedItemProps, FeedEvent } from './types.ts'
  import FeedIconEvent from './FeedIconEvent.svelte'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import FeedEvents from './FeedEvents.svelte'
  import UuidCopy from './UuidCopy.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let status: FeedItemStatus = ''
  export let icon: IconSource | undefined = undefined
  export let title = ''
  export let date: Date | undefined = undefined
  export let expandable = false
  export let uuid = ''
  export let hasPrev = false
  export let hasNext = false
  export let isChild = false
  export let children: FeedItemProps[] | undefined = undefined
  export let events: FeedEvent[] | undefined = undefined
  export let slug = ''

  let open = false

  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
</script>

<div class="relative">
  {#if hasNext}
    <span
      class:left-4={icon}
      class:left-2={!icon}
      class="absolute -bottom-4 border-l border-neutral-100 w-px h-full"
    />
  {/if}
  <div
    class:mt-3={isChild && !hasPrev}
    class:pb-3={!isChild}
    class="flex items-start justify-between space-x-2 pt-3"
  >
    <div class="relative">
      {#if hasPrev}
        <span class="absolute -top-4 inset-x-0 mx-auto border-l border-neutral-100 w-px h-full" />
      {/if}
      {#if icon}
        <FeedIconEvent {icon} {status} />
      {:else if status}
        <FeedIconStatus {status} />
      {/if}
    </div>
    <div class="flex-1 items-center justify-start">
      <p class="text-sm text-neutral-800 whitespace-nowrap">{title}</p>
      <p class="flex items-end space-x-2">
        {#if date}
          <span class="text-sm text-neutral-500 whitespace-nowrap">
            {date.toLocaleDateString('en-us', dateOptions)}
          </span>
        {/if}
        {#if uuid}
          <UuidCopy {uuid} small />
        {/if}
      </p>
      {#if open}
        {#if children?.length}
          {#each children as child, i (i)}
            <svelte:self {...child} isChild hasPrev={i > 0} hasNext={i < children.length - 1} />
          {/each}
        {:else if !events?.length}
          <div
            class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-neutral-300 rounded-full mt-2"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        {/if}
      {/if}
      {#if events?.length && open}
        <div class="mt-2">
          <FeedEvents {events} />
        </div>
      {/if}
    </div>
  </div>
  {#if expandable}
    <button
      class="absolute top-2.5 right-0"
      on:click={() => {
        open = !open
        if (open) {
          dispatch('open', slug)
        }
      }}
    >
      <svg
        class:rotate-180={open}
        class="w-5 h-5"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="8" fill="#F3F5F5" />
        <path d="M6.5 8.25004L10 11.75L13.5 8.25" stroke="#0A0A0A" stroke-width="1.2" />
      </svg>
    </button>
  {/if}
</div>
