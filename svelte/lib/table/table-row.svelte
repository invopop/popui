<script lang="ts">
  import { createBubbler, preventDefault } from 'svelte/legacy';

  const bubble = createBubbler();
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLAttributes<HTMLTableRowElement> & {
    'data-state'?: unknown
  }

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<tr
  class={cn(
    'data-[state=selected]:bg-neutral-50 data-[state=checked]:bg-workspace-accent-50 transition-colors',
    className
  )}
  {...rest}
  oncontextmenu={preventDefault(bubble('contextmenu'))}
  onclick={bubble('click')}
  onkeydown={bubble('keydown')}
>
  {@render children?.()}
</tr>
