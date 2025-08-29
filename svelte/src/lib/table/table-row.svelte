<script lang="ts">
  import { createBubbler, preventDefault } from 'svelte/legacy'
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'

  const bubble = createBubbler()
  let {
    ref = $bindable(null),
    class: className,
    children
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props()
</script>

<tr
  bind:this={ref}
  data-slot="table-row"
  class={cn(
    'data-[state=selected]:bg-neutral-50 data-[state=checked]:bg-workspace-accent-50 transition-colors',
    className
  )}
  oncontextmenu={preventDefault(bubble('contextmenu'))}
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
>
  {@render children?.()}
</tr>
