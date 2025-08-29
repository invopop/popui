<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    children,
    value
  }: TabsPrimitive.TriggerProps = $props()
</script>

<TabsPrimitive.Trigger
  bind:ref
  {value}
  data-slot="tabs-trigger"
  class={cn(
    'data-[state=active]:bg-white  inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-0.5 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm w-full',
    className
  )}
>
  {@render children?.()}
</TabsPrimitive.Trigger>
