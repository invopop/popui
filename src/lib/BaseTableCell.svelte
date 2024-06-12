<script lang="ts">
  import Viewport from 'svelte-viewport-info'
  import clsx from 'clsx'
  import type { Badge, TableField } from './types.js'
  import TagStatus from './TagStatus.svelte'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import UuidCopy from './UuidCopy.svelte'

  export let field: TableField
  export let currentIndex: number
  export let badge: Badge | null = null
  export let data: unknown = ''
  export let freeWrap = false
  export let tag = 'td'

  $: cellStyles = clsx(
    { 'tabular-nums slashed-zero': field.monospaced },
    { 'text-neutral-800 font-medium': currentIndex === 0 },
    { 'text-neutral-800 md:text-neutral-500': currentIndex > 0 },
    { 'md:text-right': field.rightAlign },
    { 'md:w-full md:max-w-0': field.fullWidth },
    { 'py-2 md:py-[11.25px]': badge },
    { 'py-2 md:py-[11.75px]': !badge },
    { 'whitespace-nowrap truncate': !freeWrap }
  )
  $: isMobile = Viewport.Width < 769
</script>

<svelte:element
  this={tag}
  class="{cellStyles} text-base px-3 tracking-normal"
  style:min-width={field.width}
  style:max-width={isMobile ? `${Viewport.Width}px` : field.width}
>
  <div class="flex flex-col">
    <span class="md:hidden text-sm text-neutral-600 font-normal">
      {field.headerLabel}
    </span>
    <span>
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
          compact
          dark={isMobile}
          on:copied
        />
      {:else}
        <span class="hidden md:inline">{data}</span>
        <span class="md:hidden">{data ? data : badge ? '' : '-'}</span>
      {/if}
      {#if badge}
        <span class:ml-2={!!data}>
          <TagStatus label={badge.label} status={badge.status} dot={Boolean(badge.dot)} />
        </span>
      {/if}
    </span>
  </div>
</svelte:element>
