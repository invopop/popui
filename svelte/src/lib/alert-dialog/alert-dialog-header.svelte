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
  class={cn('flex flex-col space-y-1 text-center sm:text-left', className)}
>
  {@render children?.()}
</div>
