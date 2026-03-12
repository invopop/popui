<script lang="ts">
  import { cn } from '$lib/utils.js'
  import type { TextCellConfig } from '../data-table-types.js'

  let { value, config }: { value: any; config?: TextCellConfig } = $props()
</script>

<div class={cn('truncate', config?.className)}>
  {#if value != null && value !== ''}
    {value}
  {:else}
    <span class="text-foreground-default-tertiary">-</span>
  {/if}
</div>
