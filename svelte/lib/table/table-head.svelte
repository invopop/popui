<script lang="ts">
  import type { HTMLThAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLThAttributes

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<th
  class={cn(
    'text-neutral-600 text-base font-normal p-3 text-left align-middle [&:has([role=checkbox])]:pr-0',
    className
  )}
  {...$$restProps}
>
  <slot />
</th>
