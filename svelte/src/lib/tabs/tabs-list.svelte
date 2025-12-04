<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    children,
    variant
  }: TabsPrimitive.ListProps & { variant?: 'md' | 'lg' } = $props()
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  class={cn(
    'bg-background-default-tertiary text-base text-foreground inline-flex items-center justify-center p-0.5 w-full',
    variant === 'lg' ? 'rounded-lg h-8' : 'rounded-md h-7',
    className
  )}
>
  {@render children?.()}
</TabsPrimitive.List>
