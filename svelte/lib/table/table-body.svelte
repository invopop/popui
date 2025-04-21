<script lang="ts">
  import { cn } from '$lib/utils'
  import type { HTMLAttributes } from 'svelte/elements'

  type $$Props = HTMLAttributes<HTMLTableSectionElement>

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<tbody class={cn('[&_tr:hover]:bg-neutral-50', className)} {...$$restProps}>
  <slot />
</tbody>
