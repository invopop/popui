<script lang="ts">
  import { cn } from '$lib/utils.js'
  import type { DateCellConfig } from '../data-table-types.js'

  let { value, config }: { value: any; config?: DateCellConfig } = $props()
</script>

{#if value != null && value !== ''}
  <span class={cn('font-mono text-base text-foreground', config?.className)}>
    {value}
  </span>
{:else}
  <span class="text-foreground-default-tertiary">-</span>
{/if}
