<script lang="ts">
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'

  let {
    ref = $bindable(null),
    class: className,
    children,
    onclick,
    oncontextmenu,
    onkeydown,
    onmouseover,
    onfocus,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props()
</script>

<tr
  bind:this={ref}
  data-slot="table-row"
  class={cn(
    'group/row hover:bg-background-default-secondary data-[state=selected]:bg-background-selected data-[state=checked]:bg-background-selected data-[state=error]:bg-background-critical data-[state=success]:bg-background-selected h-10 data-[state=selected]:hover:bg-background-selected data-[state=checked]:hover:bg-background-selected data-[state=error]:hover:bg-background-critical data-[state=success]:hover:bg-background-selected data-[focused=true]:bg-background-default-secondary',
    className
  )}
  {oncontextmenu}
  {onclick}
  {onkeydown}
  {onmouseover}
  {onfocus}
  {...restProps}
>
  {@render children?.()}
</tr>
