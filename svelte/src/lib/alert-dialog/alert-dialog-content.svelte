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
      'bg-white fixed left-[50%] top-[50%] z-[1002] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-5 pt-3 px-4 pb-4 sm:rounded-lg md:w-full',
      className
    )}
  >
    {@render children?.()}
  </AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
