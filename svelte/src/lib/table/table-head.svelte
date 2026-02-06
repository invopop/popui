<script lang="ts">
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLThAttributes } from 'svelte/elements'
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLThAttributes> = $props()
</script>

<th
  bind:this={ref}
  data-slot="table-head"
  class={cn(
    'text-foreground-default-secondary text-base font-normal text-left align-middle [&:has([role=checkbox])]:p-0 [&:has(button)]:p-0 px-3 bg-background shadow-[inset_0_-1px_0_0_var(--color-border)]',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</th>
