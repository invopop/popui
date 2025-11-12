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
    'text-foreground-default-secondary text-base font-normal text-left align-middle [&:has([role=checkbox])]:pr-0 px-3',
    className
  )}
>
  {@render children?.()}
</th>
