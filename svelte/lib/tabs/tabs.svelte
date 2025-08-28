<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = TabsPrimitive.Props

  interface Props {
    class?: $$Props['class'];
    value?: $$Props['value'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, value = $bindable(undefined), children, ...rest }: Props = $props();
  
</script>

<TabsPrimitive.Root
  bind:value
  class={cn('flex flex-col flex-1 min-h-0', className)}
  {...rest}
>
  {@render children?.()}
</TabsPrimitive.Root>
