<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    sideOffset = 0,
    side = 'top',
    children,
    arrowClasses
  }: TooltipPrimitive.ContentProps & {
    arrowClasses?: string
  } = $props()
</script>

<TooltipPrimitive.Portal>
  <TooltipPrimitive.Content
    bind:ref
    data-slot="tooltip-content"
    {sideOffset}
    {side}
    class={cn(
      'bg-background-default-negative border border-border-inverse z-50 rounded-md px-2 py-1 text-sm font-medium text-foreground-inverse leading-5 tracking-tight shadow-md',
      className
    )}
  >
    {@render children?.()}
    <TooltipPrimitive.Arrow>
      {#snippet child({ props })}
        <div
          class={cn(
            'bg-background-default-negative z-50 size-2.5 rotate-45 rounded-[2px]',
            'data-[side=top]:translate-x-1/2 data-[side=top]:translate-y-[calc(-50%_+_2px)]',
            'data-[side=bottom]:-translate-x-1/2 data-[side=bottom]:-translate-y-[calc(-50%_+_1px)]',
            'data-[side=right]:translate-x-[calc(50%_+_2px)] data-[side=right]:translate-y-1/2',
            'data-[side=left]:-translate-y-[calc(50%_-_3px)]',
            arrowClasses
          )}
          {...props}
        ></div>
      {/snippet}
    </TooltipPrimitive.Arrow>
  </TooltipPrimitive.Content>
</TooltipPrimitive.Portal>
