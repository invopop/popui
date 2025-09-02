<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    children,
    value
  }: TabsPrimitive.ContentProps = $props()
</script>

<TabsPrimitive.Content
  bind:ref
  {value}
  data-slot="tabs-content"
  class={cn(
    'flex-1 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-y-auto',
    className
  )}
>
  {@render children?.()}
</TabsPrimitive.Content>
