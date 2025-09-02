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
    'text-neutral-500 text-base flex flex-col space-y-2 justify-start items-start !mt-2',
    className
  )}
>
  {@render children?.()}
</AlertDialogPrimitive.Description>
