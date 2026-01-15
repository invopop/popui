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
    'py-[9.5px] [&:has([role=menu])]:py-[5px] pl-3 pr-3 align-middle text-foreground font-normal text-base [&:has([role=menu])]:pl-1 relative z-1 border-b border-border bg-white',
    className
  )}
  {...restProps}
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
>
  {@render children?.()}
</td>
