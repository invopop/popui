<script lang="ts">
  import Viewport from 'svelte-viewport-info'
  import clsx from 'clsx'
  import type { Badge, FeedItemStatus, TableField, TableIcon } from './types.js'
  import TagStatus from './TagStatus.svelte'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import UuidCopy from './UuidCopy.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'

  export let field: TableField
  export let isFirst = false
  export let isLast = false
  export let badge: Badge | null = null
  export let status: FeedItemStatus | null = null
  export let icons: TableIcon[] | null = null
  export let data: unknown = ''
  export let tag = 'td'
  export let selectable = false
  export let hasActions = false

  $: isSelectableFirst = isFirst && selectable

  $: cellStyles = clsx(
    { 'tabular-nums slashed-zero lining-nums': field.monospacedNums },
    { 'font-mono': field.monospaced },
    { 'whitespace-nowrap': field.nowrap },
    { 'text-neutral-800 font-medium': isFirst && !field.grayed },
    { 'text-neutral-800 md:text-neutral-500': !isFirst || field.grayed },
    { 'md:text-right': field.rightAlign },
    { 'pl-5': isFirst && !selectable },
    { 'pl-3': !isFirst && !isSelectableFirst },
    { 'pr-5': isLast && !hasActions },
    { 'pr-3': !isLast || hasActions },
    { 'px-2': (!isFirst || !selectable) && !field.noPadding },
    { 'px-0': field.noPadding }
  )
  $: isMobile = Viewport.Width < 769
</script>

<svelte:element this={tag} class="{cellStyles} text-base tracking-normal py-2">
  <div class="flex flex-col">
    <span class="md:hidden text-sm text-neutral-600 font-normal">
      {field.headerLabel}
    </span>
    <span class="flex items-center" class:justify-end={field.rightAlign}>
      {#if field.isCountry && data}
        <span class="flex items-center space-x-1">
          <BaseFlag country={String(data)} width={16} />
          <span>{getCountryName(String(data))}</span>
        </span>
      {:else if field.copy && data}
        <UuidCopy
          rightAlign={isMobile ? false : field.rightAlign}
          uuid={String(data)}
          prefixLength={4}
          suffixLength={4}
          full
          compact
          dark={isMobile}
          on:copied
        />
      {:else}
        <span class="hidden md:inline">{data}</span>
        <span class="md:hidden">{data ? data : badge || status ? '' : '-'}</span>
      {/if}
      {#if badge}
        <span class:ml-2={!!data}>
          <TagStatus label={badge.label} status={badge.status} dot={Boolean(badge.dot)} />
        </span>
      {/if}
      {#if status}
        <span class:ml-2={!!data}>
          <FeedIconStatus {status} />
        </span>
      {/if}
      {#if icons}
        <span class:ml-2={!!data} class="flex items-center gap-1 flex-shrink-0">
          {#each icons as icon}
            <div class="border border-neutral-200 rounded-md p-px">
              {#if typeof icon === 'string'}
                <img alt="icon" src={icon} class="h-4 w-4" />
              {:else}
                <Icon src={icon} class="h-4 w-4" />
              {/if}
            </div>
          {/each}
        </span>
      {/if}
    </span>
  </div>
</svelte:element>
