<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { buttonVariants } from '$lib/button/index.js'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    children
  }: AlertDialogPrimitive.CancelProps = $props()
</script>

<AlertDialogPrimitive.Cancel
  bind:ref
  data-slot="alert-dialog-cancel"
  class={cn(buttonVariants({ variant: 'secondary' }), 'mt-2 sm:mt-0', className)}
  {onkeydown}
>
  {@render children?.()}
</AlertDialogPrimitive.Cancel>
