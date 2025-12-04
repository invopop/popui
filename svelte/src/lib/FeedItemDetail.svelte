<script lang="ts">
  import clsx from 'clsx'
  import type { FeedItemDetailProps } from './types.ts'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import UuidCopy from './UuidCopy.svelte'
  import FeedEvents from './FeedEvents.svelte'
  import { slide } from 'svelte/transition'
  import SeparatorHorizontal from './SeparatorHorizontal.svelte'
  import BaseButton from './BaseButton.svelte'
  import { Close } from '@invopop/ui-icons'

  let {
    status = undefined,
    title = '',
    uuid = '',
    events = [],
    idLabel = 'ID:',
    cancelable = false,
    onCopied,
    onCancel
  }: FeedItemDetailProps = $props()

  let open = $state(false)
  let styles = $derived(
    clsx('pl-3 flex items-center space-x-1.5', {
      'pr-3 py-2.5': !cancelable,
      'py-2 pr-2': cancelable
    })
  )
</script>

<div class="w-full rounded-lg border border-border">
  <div class={styles}>
    {#if status}
      <FeedIconStatus {status} />
    {/if}
    <span class="flex-1 truncate font-medium text-foreground text-base">{title}</span>
    {#if cancelable}
      <BaseButton
        size="sm"
        icon={Close}
        variant="secondary"
        onclick={() => {
          onCancel?.()
        }}
      >
        Cancel
      </BaseButton>
    {/if}
  </div>
  <SeparatorHorizontal />
  <div class="pl-3 py-1 pr-2.5 flex items-center space-x-0.5">
    <span class="text-sm text-foreground-default-secondary whitespace-nowrap">{idLabel}</span>
    {#if uuid}
      <UuidCopy {uuid} full small {onCopied} />
    {/if}
  </div>
  {#if events.length}
    <SeparatorHorizontal />
    <div
      class="px-3 py-2 text-sm text-foreground-default-secondary flex items-center justify-between"
    >
      <span>Logs</span>
      <button
        class="cursor-pointer"
        aria-label="Toggle details"
        onclick={() => {
          open = !open
        }}
      >
        <svg
          class:rotate-180={open}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="16" height="16" rx="4" fill="#F3F4F6" />
          <path d="M6.5 8.25004L10 11.75L13.5 8.25" stroke="#030712" stroke-width="1.1" />
        </svg>
      </button>
    </div>
    {#if open}
      <div transition:slide class="px-3 pb-3">
        <FeedEvents {events} />
      </div>
    {/if}
  {/if}
</div>
