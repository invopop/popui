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
    onfocus
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props()
</script>

<tr
  bind:this={ref}
  data-slot="table-row"
  class={cn(
    'data-[state=selected]:bg-background-default-secondary data-[state=checked]:bg-background-selected transition-colors border-b border-border h-10',
    className
  )}
  {oncontextmenu}
  {onclick}
  {onkeydown}
  {onmouseover}
  {onfocus}
>
  {@render children?.()}
</tr>
