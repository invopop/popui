<script lang="ts">
  import type { HTMLThAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLThAttributes

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<th
  class={cn(
    'text-neutral-600 text-base font-normal p-3 text-left align-middle [&:has([role=checkbox])]:pr-0',
    className
  )}
  {...rest}
>
  {@render children?.()}
</th>
