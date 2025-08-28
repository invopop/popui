<script lang="ts">
  import { Tabs as TabsPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'

  type $$Props = TabsPrimitive.TriggerProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type $$Events = TabsPrimitive.TriggerEvents

  interface Props {
    class?: $$Props['class'];
    value: $$Props['value'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, value, children, ...rest }: Props = $props();
  
</script>

<TabsPrimitive.Trigger
  class={cn(
    'data-[state=active]:bg-white  inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-0.5 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm w-full',
    className
  )}
  {value}
  {...rest}
  on:click
>
  {@render children?.()}
</TabsPrimitive.Trigger>
