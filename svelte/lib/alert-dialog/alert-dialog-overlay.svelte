<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { fade } from 'svelte/transition'
  import { cn } from '$lib/utils.js'

  type $$Props = AlertDialogPrimitive.OverlayProps

  let className: $$Props['class'] = undefined
  export let transition: $$Props['transition'] = fade
  export let transitionConfig: $$Props['transitionConfig'] = {
    duration: 150
  }
  export { className as class }
</script>

<AlertDialogPrimitive.Overlay
  {transition}
  {transitionConfig}
  class={cn('bg-neutral-800/30 fixed inset-0 z-[1001]', className)}
  {...$$restProps}
/>
