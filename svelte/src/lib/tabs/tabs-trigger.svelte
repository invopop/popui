<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    children,
    value,
    variant
  }: TabsPrimitive.TriggerProps & { variant?: 'md' | 'lg' } = $props()
</script>

<TabsPrimitive.Trigger
  bind:ref
  {value}
  data-slot="tabs-trigger"
  class={cn(
    'data-[state=active]:bg-white inline-flex items-center justify-center whitespace-nowrap px-3 py-0.5 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm w-full cursor-pointer h-full',
    variant === 'lg' ? 'rounded-md' : 'rounded',
    className
  )}
>
  {@render children?.()}
</TabsPrimitive.Trigger>
