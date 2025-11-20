<script lang="ts">
  import type { BaseTableCellContentProps } from './types'
  import TagStatus from './TagStatus.svelte'
  import FeedIconStatus from './FeedIconStatus.svelte'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import { Icon } from '@steeze-ui/svelte-icon'
  import ButtonUuidCopy from './ButtonUuidCopy.svelte'

  let {
    field,
    data = '',
    badge = null,
    status = null,
    icons = null,
    onCopied
  }: BaseTableCellContentProps = $props()
</script>

<div class="flex flex-col">
  <span class="md:hidden text-sm font-normal">
    {field.headerLabel}
  </span>
  <span class="flex items-center gap-2" class:justify-end={field.rightAlign}>
    {#if field.isCountry && data}
      <span class="flex items-center space-x-1">
        <BaseFlag country={String(data)} />
        <span>{getCountryName(String(data))}</span>
      </span>
    {:else if field.copy && data}
      <ButtonUuidCopy uuid={String(data)} full oncopied={onCopied} />
    {:else if data}
      <span class="hidden md:inline">{data}</span>
      <span class="md:hidden">{data ? data : badge || status ? '' : '-'}</span>
    {/if}
    {#if badge}
      <TagStatus label={badge.label} status={badge.status} dot={Boolean(badge.dot)} />
    {/if}
    {#if status}
      <span class:ml-2={!!data}>
        <FeedIconStatus {status} />
      </span>
    {/if}
    {#if icons}
      <span class:ml-2={!!data} class="flex items-center gap-1 shrink-0">
        {#each icons as icon}
          <div class="border border-border rounded-md p-px">
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
