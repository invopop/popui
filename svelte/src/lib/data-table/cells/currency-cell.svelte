<script lang="ts">
  import { cn } from '$lib/utils.js'
  import type { CurrencyCellConfig } from '../data-table-types.js'

  let { value, config }: { value: any; config?: CurrencyCellConfig } = $props()
</script>

<span class={cn('font-mono text-base text-foreground text-right block', config?.className)}>
  {value}
</span>
