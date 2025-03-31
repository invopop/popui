<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { buttonVariants, type Variant } from '$lib/button/index.js'
  import { cn } from '$lib/utils.js'

  type $$Props = AlertDialogPrimitive.ActionProps & { destructive: boolean }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = AlertDialogPrimitive.ActionEvents

  let className: $$Props['class'] = undefined
  let destructive: $$Props['destructive'] = false
  let el: $$Props['el']

  export { className as class, destructive }

  $: variant = (destructive ? 'destructive' : 'primary') as Variant
</script>

<AlertDialogPrimitive.Action
  bind:el
  class={cn(buttonVariants({ variant }), className)}
  {...$$restProps}
  on:click
  on:keydown
  let:builder
>
  <slot {builder} />
</AlertDialogPrimitive.Action>
