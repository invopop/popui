<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { buttonVariants } from '$lib/button/index.js'
  import { cn } from '$lib/utils.js'

  type $$Props = AlertDialogPrimitive.CancelProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = AlertDialogPrimitive.CancelEvents

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<AlertDialogPrimitive.Cancel
  class={cn(buttonVariants({ variant: 'secondary' }), 'mt-2 sm:mt-0', className)}
  {...$$restProps}
  on:click
  on:keydown
  let:builder
>
  <slot {builder} />
</AlertDialogPrimitive.Cancel>
