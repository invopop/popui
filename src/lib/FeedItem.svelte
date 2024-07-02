<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import type { FeedItemStatus, FeedItemUser } from './types.ts'
  import FeedIconEvent from './FeedIconEvent.svelte'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import { createEventDispatcher } from 'svelte'
  import BaseButton from './BaseButton.svelte'
  import ProfileAvatar from './ProfileAvatar.svelte'

  const dispatch = createEventDispatcher()

  export let status: FeedItemStatus | undefined = undefined
  export let icon: IconSource | undefined = undefined
  export let title = ''
  export let date: Date | undefined = undefined
  export let hasNext = false
  export let slug = ''
  export let viewable = false
  export let viewableText = 'View'
  export let user: FeedItemUser | undefined = undefined

  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  } as Intl.DateTimeFormatOptions
</script>

<div id={`feed-item-${slug}`} class="relative text-left w-full min-w-[344px]">
  {#if hasNext && icon}
    <span class="absolute bottom-[-20px] left-2 border-l border-neutral-100 w-px h-[58px]" />
  {/if}
  <div class="flex items-start justify-between space-x-2 py-3">
    <div class="relative">
      {#if icon}
        <FeedIconEvent {icon} />
      {/if}
    </div>
    <div
      class="flex-1 items-center justify-start pl-2.5 py-2 pr-2 rounded-lg border border-neutral-100"
    >
      <div
        class="text-base text-neutral-800 whitespace-nowrap tracking-normal font-medium flex items-center gap-1 {viewable
          ? 'max-w-[260px]'
          : 'max-w-[320px]'}"
      >
        {#if user}
          <div class="mr-0.5">
            <ProfileAvatar small {...user} />
          </div>
        {/if}
        <p class="truncate" {title}>{title}</p>

        {#if status}
          <FeedIconStatus {status} />
        {/if}
      </div>
      <p class="flex flex-col space-y-0.5" class:ml-[22px]={user}>
        {#if date}
          <span
            class="text-sm text-neutral-500 whitespace-nowrap tabular-nums slashed-zero tracking-normal"
          >
            {date.toLocaleDateString('en-us', dateOptions)}
          </span>
        {/if}
      </p>
    </div>
  </div>
  {#if viewable}
    <span class="absolute top-5 right-2">
      <BaseButton
        small
        variant="secondary"
        on:click={() => {
          dispatch('view')
        }}
      >
        {viewableText}
      </BaseButton>
    </span>
  {/if}
</div>
