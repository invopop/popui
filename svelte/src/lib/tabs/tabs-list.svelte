<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let { ref = $bindable(null), class: className, children }: TabsPrimitive.ListProps = $props()
</script>

<TabsPrimitive.List
  bind:ref
  data-slot="tabs-list"
  class={cn(
    'bg-background-default-secondary border border-border text-base text-foreground inline-flex h-7 items-center justify-center rounded-md p-0.5 w-full',
    className
  )}
>
  {@render children?.()}
</TabsPrimitive.List>
