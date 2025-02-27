<script lang="ts">
  import type { Badge, FeedItemStatus, TableField, TableIcon } from './types'
  import TagStatus from './TagStatus.svelte'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import UuidCopy from './UuidCopy.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'

  export let field: TableField
  export let data: unknown = ''
  export let isMobile = false
  export let badge: Badge | null = null
  export let status: FeedItemStatus | null = null
  export let icons: TableIcon[] | null = null
</script>

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
