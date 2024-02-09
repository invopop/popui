<script lang="ts">
  import clsx from 'clsx'
  import type { Badge, TableField } from './types.js'
  import TagStatus from './TagStatus.svelte'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import UuidCopy from './UuidCopy.svelte'

  export let field: TableField
  export let currentIndex: number
  export let totalFields: number
  export let totalActions: number
  export let badge: Badge | null = null
  export let data: unknown = ''

  $: cellStyles = clsx(
    { 'tabular-nums slashed-zero': field.monospaced },
    { 'text-neutral-500': field.grayed },
    { 'text-neutral-800': !field.grayed },
    { 'pl-4 font-medium': currentIndex === 0 },
    { 'pl-3': currentIndex > 0 },
    { 'pr-4': totalActions === 0 && currentIndex === totalFields - 1 },
    { 'pr-3': totalActions > 0 || currentIndex < totalFields - 1 },
    { 'text-right': field.rightAlign }
  )
</script>

<td class="{cellStyles} whitespace-nowrap text-sm py-2.5 tracking-normal">
  <span>
    {#if field.isCountry}
      <span class="flex items-center space-x-1">
        <BaseFlag country={String(data)} />
        <span>{getCountryName(String(data))}</span>
      </span>
    {:else if field.copy && data}
      <UuidCopy rightAlign={field.rightAlign} uuid={String(data)} />
    {:else}
      <span>{data}</span>
    {/if}
    {#if badge}
      <span class="ml-2">
        <TagStatus label={badge.label} status={badge.status} />
      </span>
    {/if}
  </span>
</td>
