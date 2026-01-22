<script lang="ts">
  import { createBubbler } from 'svelte/legacy'
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLTdAttributes } from 'svelte/elements'

  const bubble = createBubbler()
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLTdAttributes> = $props()
</script>

<td
  bind:this={ref}
  data-slot="table-cell"
  class={cn(
    'py-[9px] [&:has([role=menu])]:py-0 [&:has([data-uuid-copy])]:py-0 pl-3 pr-3 align-middle text-foreground font-normal text-base [&:has([role=menu])]:pl-1 relative z-1 [&:has([role=menu])]:bg-white [&:has([type=checkbox])]:bg-white',
    className
  )}
  {...restProps}
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
>
  {@render children?.()}
</td>
