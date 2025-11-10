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
    'data-[state=selected]:bg-neutral-5 data-[state=checked]:bg-workspace-accent-50 transition-colors',
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
