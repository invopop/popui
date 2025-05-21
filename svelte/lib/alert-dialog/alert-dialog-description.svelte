<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = AlertDialogPrimitive.DescriptionProps

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<AlertDialogPrimitive.Description
  class={cn(
    'text-neutral-500 text-base flex flex-col space-y-2 justify-start items-start !mt-2',
    className
  )}
  {...$$restProps}
>
  <slot />
</AlertDialogPrimitive.Description>
