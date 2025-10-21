<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { buttonVariants, type ButtonVariant } from '$lib/button/index.js'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    destructive = false,
    children,
    ...restProps
  }: AlertDialogPrimitive.ActionProps & { destructive: boolean } = $props()

  let variant = $derived((destructive ? 'destructive' : 'primary') as ButtonVariant)
</script>

<AlertDialogPrimitive.Action
  bind:ref
  data-slot="alert-dialog-action"
  class={cn(buttonVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</AlertDialogPrimitive.Action>
