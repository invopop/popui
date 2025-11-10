<script lang="ts">
  import { createBubbler } from 'svelte/legacy'
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLTdAttributes } from 'svelte/elements'

  const bubble = createBubbler()
  let {
    ref = $bindable(null),
    class: className,
    children
  }: WithElementRef<HTMLTdAttributes> = $props()
</script>

<td
  bind:this={ref}
  data-slot="table-cell"
  class={cn(
    'py-3 pl-3 pr-3 align-middle text-foreground-default-secondary font-normal text-base [&:has([role=checkbox])]:pr-2 [&:has([role=menu])]:pl-1 relative z-1',
    className
  )}
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
>
  {@render children?.()}
</td>
