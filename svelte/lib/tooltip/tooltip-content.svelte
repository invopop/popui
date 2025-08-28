<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui'
  import { cn, flyAndScale } from '$lib/utils.js'

  type $$Props = TooltipPrimitive.ContentProps

  interface Props {
    class?: $$Props['class'];
    sideOffset?: $$Props['sideOffset'];
    transition?: $$Props['transition'];
    transitionConfig?: $$Props['transitionConfig'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let {
    class: className = undefined,
    sideOffset = 4,
    transition = flyAndScale,
    transitionConfig = {
    y: 8,
    duration: 150
  },
    children,
    ...rest
  }: Props = $props();
  
</script>

<TooltipPrimitive.Content
  {transition}
  {transitionConfig}
  {sideOffset}
  class={cn(
    'bg-neutral-700 text-white-80 z-50 rounded-md px-3 py-2 text-base font-medium shadow-md',
    className
  )}
  {...rest}
>
  {@render children?.()}
  <TooltipPrimitive.Arrow />
</TooltipPrimitive.Content>
