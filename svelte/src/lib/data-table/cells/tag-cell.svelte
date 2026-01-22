<script lang="ts">
  import TagStatus from '$lib/TagStatus.svelte'
  import type { TagCellConfig } from '../data-table-types.js'

  let { value, config }: { value: string; config: TagCellConfig } = $props()

  const option = $derived(config.options.find((opt) => opt.value === value))
</script>

{#if option}
  <TagStatus label={option.label} status={option.color} dot={config.showDot ?? false} />
{/if}
