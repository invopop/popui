<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = TabsPrimitive.ContentProps

  interface Props {
    class?: $$Props['class'];
    value: $$Props['value'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, value, children, ...rest }: Props = $props();
  
</script>

<TabsPrimitive.Content
  class={cn(
    'flex-1 mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-y-auto',
    className
  )}
  {value}
  {...rest}
>
  {@render children?.()}
</TabsPrimitive.Content>
