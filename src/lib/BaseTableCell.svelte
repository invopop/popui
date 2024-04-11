<script lang="ts">
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

  $: cellStyles = clsx(
    { 'tabular-nums slashed-zero': field.monospaced },
    { 'text-neutral-800 font-medium': currentIndex === 0 },
    { 'text-neutral-500': currentIndex > 0 },
    { 'text-right': field.rightAlign },
    { 'w-full max-w-0': field.fullWidth },
    { 'py-[11.25px]': badge },
    { 'py-[11.75px]': !badge }
  )
</script>

<td
  class="{cellStyles} whitespace-nowrap text-base px-3 tracking-normal truncate"
  style:min-width={field.width}
  style:max-width={field.width}
>
  <span>
    {#if field.isCountry && data}
      <span class="flex items-center space-x-1">
        <BaseFlag country={String(data)} />
        <span>{getCountryName(String(data))}</span>
      </span>
    {:else if field.copy && data}
      <UuidCopy
        rightAlign={field.rightAlign}
        uuid={String(data)}
        prefixLength={4}
        suffixLength={4}
        on:copied
      />
    {:else}
      <span>{data}</span>
    {/if}
    {#if badge}
      <span class:ml-2={!!data}>
        <TagStatus label={badge.label} status={badge.status} dot={Boolean(badge.dot)} />
      </span>
    {/if}
  </span>
</td>
