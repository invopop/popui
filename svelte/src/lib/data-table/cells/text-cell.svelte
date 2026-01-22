<script lang="ts">
  import { cn } from '$lib/utils.js'
  import type { TextCellConfig } from '../data-table-types.js'

  let { value, config }: { value: any; config?: TextCellConfig } = $props()
</script>

<div class={cn('truncate', config?.className)}>
  {value}
</div>
