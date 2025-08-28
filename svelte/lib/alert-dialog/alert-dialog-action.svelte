<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import { buttonVariants, type Variant } from '$lib/button/index.js'
  import { cn } from '$lib/utils.js'

  type $$Props = AlertDialogPrimitive.ActionProps & { destructive: boolean }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = AlertDialogPrimitive.ActionEvents

  interface Props {
    class?: $$Props['class'];
    destructive?: $$Props['destructive'];
    el?: $$Props['el'];
    children?: import('svelte').Snippet<[any]>;
    [key: string]: any
  }

  let {
    class: className = undefined,
    destructive = false,
    el = $bindable(undefined),
    children,
    ...rest
  }: Props = $props();

  

  let variant = $derived((destructive ? 'destructive' : 'primary') as Variant)

  const children_render = $derived(children);
</script>

<AlertDialogPrimitive.Action
  bind:el
  class={cn(buttonVariants({ variant }), className)}
  {...rest}
  on:click
  on:keydown
  
>
  {#snippet children({ builder })}
    {@render children_render?.({ builder, })}
  {/snippet}
</AlertDialogPrimitive.Action>
