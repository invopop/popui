<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn, type WithElementRef } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    children
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<div
  bind:this={ref}
  data-slot="alert-dialog-header"
  class={cn('flex flex-col gap-1 px-4 py-3', className)}
>
  {@render children?.()}
</div>
