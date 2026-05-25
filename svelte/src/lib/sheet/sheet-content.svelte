<script lang="ts" module>
  export type Side = 'top' | 'right' | 'bottom' | 'left'
</script>

<script lang="ts">
  import { Dialog as SheetPrimitive } from 'bits-ui'
  import { Close } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { Snippet } from 'svelte'
  import SheetPortal from './sheet-portal.svelte'
  import SheetOverlay from './sheet-overlay.svelte'
  import { cn, type WithoutChildrenOrChild } from '$lib/utils.js'
  import type { ComponentProps } from 'svelte'

  let {
    ref = $bindable(null),
    class: className,
    side = 'right',
    showCloseButton = true,
    portalProps,
    children,
    ...restProps
  }: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>
    side?: Side
    showCloseButton?: boolean
    children: Snippet
  } = $props()
</script>

<SheetPortal {...portalProps}>
  <SheetOverlay />
  <SheetPrimitive.Content
    bind:ref
    data-slot="sheet-content"
    data-side={side}
    class={cn(
      'bg-background text-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out',
      'data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t',
      'data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r',
      'data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l',
      'data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b',
      'data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'data-[side=bottom]:data-[state=open]:slide-in-from-bottom data-[side=bottom]:data-[state=closed]:slide-out-to-bottom',
      'data-[side=left]:data-[state=open]:slide-in-from-left data-[side=left]:data-[state=closed]:slide-out-to-left',
      'data-[side=right]:data-[state=open]:slide-in-from-right data-[side=right]:data-[state=closed]:slide-out-to-right',
      'data-[side=top]:data-[state=open]:slide-in-from-top data-[side=top]:data-[state=closed]:slide-out-to-top',
      className
    )}
    {...restProps}
  >
    {@render children?.()}
    {#if showCloseButton}
      <SheetPrimitive.Close
        data-slot="sheet-close"
        class="absolute top-4 right-4 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Icon src={Close} class="size-4" />
        <span class="sr-only">Close</span>
      </SheetPrimitive.Close>
    {/if}
  </SheetPrimitive.Content>
</SheetPortal>
