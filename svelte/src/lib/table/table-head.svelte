<script lang="ts">
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLThAttributes } from 'svelte/elements'
  let {
    ref = $bindable(null),
    class: className,
    children
  }: WithElementRef<HTMLThAttributes> = $props()
</script>

<th
  bind:this={ref}
  data-slot="table-head"
  class={cn(
    'text-neutral-600 text-base font-normal p-3 text-left align-middle [&:has([role=checkbox])]:pr-0',
    className
  )}
>
  {@render children?.()}
</th>
