<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { HTMLTdAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLTdAttributes

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<td
  class={cn(
    'py-3 pl-3 pr-3 align-middle text-neutral-500 font-normal text-base [&:has([role=checkbox])]:pr-2 [&:has([role=menu])]:pl-1 relative',
    className
  )}
  {...rest}
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
>
  {@render children?.()}
</td>
