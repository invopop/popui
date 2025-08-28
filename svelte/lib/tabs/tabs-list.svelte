<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = TabsPrimitive.ListProps

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<TabsPrimitive.List
  class={cn(
    'bg-neutral-100 border border-neutral-200 text-base text-neutral-800 inline-flex h-7 items-center justify-center rounded-md p-0.5 w-full',
    className
  )}
  {...rest}
>
  {@render children?.()}
</TabsPrimitive.List>
