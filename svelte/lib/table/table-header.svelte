<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '$lib/utils.js'

  type $$Props = HTMLAttributes<HTMLTableSectionElement>

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<thead
  class={cn('[&_tr]:border-b [&_tr]:border-neutral-100 bg-white', className)}
  {...$$restProps}
  on:click
  on:keydown
>
  <slot />
</thead>
