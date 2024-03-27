<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import type { FeedItemStatus, FeedItemProps, FeedEvent } from './types.ts'
  import FeedIconEvent from './FeedIconEvent.svelte'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import FeedEvents from './FeedEvents.svelte'
  import { createEventDispatcher } from 'svelte'
  import BaseButton from './BaseButton.svelte'
  import { Duplicate } from '@invopop/ui-icons'

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

<span id={`feed-item-${slug}`} class="relative text-left w-full">
  {#if hasNext && icon}
    <span class="absolute -bottom-6 left-2 border-l border-neutral-100 w-px h-full" />
  {/if}
  <div
    class:mt-3={isChild && !hasPrev}
    class:pb-3={!isChild}
    class="flex items-start justify-between space-x-2 pt-3"
  >
    <div class="relative">
      {#if icon}
        <FeedIconEvent {icon} />
      {/if}
    </div>
    <div
      class="flex-1 items-center justify-start pl-2.5 py-2 pr-2 rounded-md border border-neutral-100"
    >
      <p
        class="text-base text-neutral-800 whitespace-nowrap tracking-normal font-medium flex items-center gap-1"
      >
        <span>{title}</span>

        {#if status}
          <FeedIconStatus {status} />
        {/if}
      </p>
      <p class="flex flex-col space-y-0.5">
        {#if date}
          <span
            class="text-sm text-neutral-500 whitespace-nowrap tabular-nums slashed-zero tracking-normal"
          >
            {date.toLocaleDateString('en-us', dateOptions)}
          </span>
        {/if}
      </p>
      {#if uuid}
        <div
          class="border-t border-dashed border-neutral-100 mt-2.5 flex items-center justify-between py-1"
        >
          <span class="text-sm text-neutral-500">ID: {uuid}</span>
          <button
            on:click|stopPropagation={async () => {
              await navigator.clipboard.writeText(uuid)
              dispatch('copied', uuid)
            }}
          >
            <Icon src={Duplicate} class="w-4 h-4 text-neutral-500" />
          </button>
        </div>
      {/if}
      {#if open}
        {#if children?.length}
          {#each children as child, i (i)}
            <svelte:self
              {...child}
              isChild
              hasPrev={i > 0}
              hasNext={i < children.length - 1}
              on:copied
            />
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
    <span class="absolute top-5 right-2">
      <BaseButton
        small
        variant="secondary"
        on:click={() => {
          open = !open
          if (open) {
            dispatch('open', slug)
          }
        }}
      >
        View
      </BaseButton>
    </span>
  {/if}
</span>
