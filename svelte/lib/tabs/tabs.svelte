<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = TabsPrimitive.Props

  let className: $$Props['class'] = undefined
  let value: $$Props['value'] = undefined
  export { className as class, value }
</script>

<TabsPrimitive.Root
  bind:value
  class={cn('flex flex-col flex-1 min-h-0', className)}
  {...$$restProps}
>
  <slot />
</TabsPrimitive.Root>
