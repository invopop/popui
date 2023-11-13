<script lang="ts">
  import clsx from 'clsx'
  import type { Badge, TableField } from './types.js'
  import TagStatus from './TagStatus.svelte'

  export let field: TableField
  export let currentIndex: number
  export let totalFields: number
  export let totalActions: number
  export let badge: Badge | null = null
  export let data: unknown = ''

  $: cellStyles = clsx(
    { 'text-neutral-500': field.grayed },
    { 'text-neutral-800': !field.grayed },
    { 'pl-4 font-semibold': currentIndex === 0 },
    { 'pl-3': currentIndex > 0 },
    { 'pr-4': totalActions === 0 && currentIndex === totalFields - 1 },
    { 'pr-3': totalActions > 0 || currentIndex < totalFields - 1 }
  )
</script>

<td class="{cellStyles} whitespace-nowrap text-sm py-2.5">
  <span>
    <span>{data}</span>
    {#if badge}
      <span class="ml-2">
        <TagStatus label={badge.label} status={badge.status} />
      </span>
    {/if}
  </span>
</td>
