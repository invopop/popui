<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    value = $bindable(''),
    class: className,
    children
  }: TabsPrimitive.RootProps = $props()
</script>

<TabsPrimitive.Root
  bind:ref
  bind:value
  data-slot="tabs"
  class={cn('flex flex-col flex-1 min-h-0', className)}
>
  {@render children?.()}
</TabsPrimitive.Root>
