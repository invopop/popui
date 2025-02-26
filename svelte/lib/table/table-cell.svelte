<script lang="ts">
  import type { HTMLTdAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLTdAttributes

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<td
  class={cn(
    'p-3 align-middle text-neutral-500 font-normal text-base [&:has([role=checkbox])]:pr-0',
    className
  )}
  {...$$restProps}
  on:click
  on:keydown
>
  <slot />
</td>
