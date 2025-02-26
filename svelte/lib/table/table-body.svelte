<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type $$Props = HTMLAttributes<HTMLTableSectionElement>

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<tbody class={className} {...$$restProps}>
  <slot />
</tbody>
