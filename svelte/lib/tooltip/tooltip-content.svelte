<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui'
  import { cn, flyAndScale } from '$lib/utils.js'

  type $$Props = TooltipPrimitive.ContentProps

  let className: $$Props['class'] = undefined
  export let sideOffset: $$Props['sideOffset'] = 4
  export let transition: $$Props['transition'] = flyAndScale
  export let transitionConfig: $$Props['transitionConfig'] = {
    y: 8,
    duration: 150
  }
  export { className as class }
</script>

<TooltipPrimitive.Content
  {transition}
  {transitionConfig}
  {sideOffset}
  class={cn(
    'bg-neutral-700 text-white-80 z-50 rounded-md px-3 py-2 text-base font-medium shadow-md',
    className
  )}
  {...$$restProps}
>
  <slot />
  <TooltipPrimitive.Arrow />
</TooltipPrimitive.Content>
