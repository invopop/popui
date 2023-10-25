<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import FeedIconEvent from './FeedIconEvent.svelte'
  import UuidCopy from './UuidCopy.svelte'

  export let status: 'success' | 'failure' | '' = ''
  export let icon: IconSource | undefined = undefined
  export let title = ''
  export let date: Date | undefined = undefined
  export let expandable = false
  export let uuid = ''

  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
</script>

<div class="flex items-center justify-between space-x-2">
  <div>
    <FeedIconEvent {icon} {status} />
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
  </div>
  {#if expandable}
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="#F3F5F5" />
      <path d="M6.5 8.25004L10 11.75L13.5 8.25" stroke="#0A0A0A" stroke-width="1.2" />
    </svg>
  {/if}
</div>
