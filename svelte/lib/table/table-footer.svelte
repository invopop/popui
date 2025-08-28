<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLAttributes<HTMLTableSectionElement>

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<tfoot class={cn('bg-muted/50 text-primary-foreground font-medium', className)} {...rest}>
  {@render children?.()}
</tfoot>
