<script lang="ts">
  import type { HTMLTableAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLTableAttributes

  interface Props {
    class?: $$Props['class'];
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let { class: className = undefined, children, ...rest }: Props = $props();
  
</script>

<div class="relative w-full">
  <table class={cn('w-full caption-bottom', className)} {...rest}>
    {@render children?.()}
  </table>
</div>
