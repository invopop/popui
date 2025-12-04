<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    children
  }: AlertDialogPrimitive.DescriptionProps = $props()
</script>

<AlertDialogPrimitive.Description
  bind:ref
  data-slot="alert-dialog-description"
  class={cn(
    'text-base font-normal leading-5 tracking-tight text-foreground-default-secondary',
    className
  )}
>
  {@render children?.()}
</AlertDialogPrimitive.Description>
