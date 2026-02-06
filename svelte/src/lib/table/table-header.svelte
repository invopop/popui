<script lang="ts">
  import { createBubbler } from 'svelte/legacy'
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'

  const bubble = createBubbler()
  let {
    ref = $bindable(null),
    class: className,
    children
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<thead
  bind:this={ref}
  data-slot="table-header"
  class={cn('sticky top-0 z-20 bg-background', className)}
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
>
  {@render children?.()}
</thead>
