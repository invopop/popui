<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = AlertDialogPrimitive.DescriptionProps

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<AlertDialogPrimitive.Description
  class={cn(
    'text-neutral-500 text-base flex flex-col space-y-2 justify-start items-start !mt-2',
    className
  )}
  {...rest}
>
  {@render children?.()}
</AlertDialogPrimitive.Description>
