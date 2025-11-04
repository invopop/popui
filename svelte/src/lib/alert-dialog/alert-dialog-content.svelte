<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import AlertDialogOverlay from './alert-dialog-overlay.svelte'
  import { cn, type WithoutChild, type WithoutChildrenOrChild } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    portalProps,
    children
  }: WithoutChild<AlertDialogPrimitive.ContentProps> & {
    portalProps?: WithoutChildrenOrChild<AlertDialogPrimitive.PortalProps>
  } = $props()
</script>

<AlertDialogPrimitive.Portal {...portalProps}>
  <AlertDialogOverlay />
  <AlertDialogPrimitive.Content
    bind:ref
    data-slot="alert-dialog-content"
    class={cn(
      'bg-background fixed left-1/2 top-1/2 z-[1002] flex flex-col w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-clip',
      className
    )}
  >
    {@render children?.()}
  </AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
