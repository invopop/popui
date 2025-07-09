<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = TabsPrimitive.ListProps

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<TabsPrimitive.List
  class={cn(
    'bg-neutral-100 border border-neutral-200 text-base text-neutral-800 inline-flex h-7 items-center justify-center rounded-md p-0.5 w-full',
    className
  )}
  {...$$restProps}
>
  <slot />
</TabsPrimitive.List>
