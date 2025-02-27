<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLAttributes<HTMLTableRowElement> & {
    'data-state'?: unknown
  }

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<tr
  class={cn(
    'data-[state=selected]:bg-neutral-50 data-[state=checked]:bg-workspace-accent-50 transition-colors',
    className
  )}
  {...$$restProps}
  on:contextmenu|preventDefault
  on:click
  on:keydown
>
  <slot />
</tr>
