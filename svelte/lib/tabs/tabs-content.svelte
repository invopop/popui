<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = TabsPrimitive.ContentProps

  let className: $$Props['class'] = undefined
  export let value: $$Props['value']
  export { className as class }
</script>

<TabsPrimitive.Content
  class={cn(
    'flex-1 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-y-auto',
    className
  )}
  {value}
  {...$$restProps}
>
  <slot />
</TabsPrimitive.Content>
