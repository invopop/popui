<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import * as AlertDialog from './index.js'
  import { cn, flyAndScale } from '$lib/utils.js'

  type $$Props = AlertDialogPrimitive.ContentProps

  export let transition: $$Props['transition'] = flyAndScale
  export let transitionConfig: $$Props['transitionConfig'] = undefined

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<AlertDialog.Portal>
  <AlertDialog.Overlay />
  <AlertDialogPrimitive.Content
    {transition}
    {transitionConfig}
    class={cn(
      'bg-white fixed left-[50%] top-[50%] z-[1002] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-5 border pt-3 px-4 pb-4 sm:rounded-lg md:w-full',
      className
    )}
    {...$$restProps}
  >
    <slot />
  </AlertDialogPrimitive.Content>
</AlertDialog.Portal>
