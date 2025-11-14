<script lang="ts">
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLAttributes } from 'svelte/elements'
  let {
    ref = $bindable(null),
    class: className,
    children
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<tbody
  bind:this={ref}
  data-slot="table-body"
  class={cn('[&_tr:hover]:bg-background-default-secondary', className)}
>
  {@render children?.()}
</tbody>
