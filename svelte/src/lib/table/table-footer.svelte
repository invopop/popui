<script lang="ts">
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'
  let {
    ref = $bindable(null),
    class: className,
    children
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<tfoot
  bind:this={ref}
  data-slot="table-footer"
  class={cn('bg-muted/50 text-foreground font-medium', className)}
>
  {@render children?.()}
</tfoot>
