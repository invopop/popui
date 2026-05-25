<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  import { cn, type WithElementRef } from '$lib/utils.js'

  let {
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    ...restProps
  }: WithElementRef<HTMLInputAttributes, HTMLInputElement> = $props()
</script>

<input
  bind:this={ref}
  bind:value
  data-slot="sidebar-input"
  data-sidebar="input"
  class={cn(
    'bg-background border-input flex h-8 w-full rounded-md border px-3 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  {...restProps}
/>
