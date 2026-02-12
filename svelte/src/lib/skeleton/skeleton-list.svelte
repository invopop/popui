<script lang="ts">
  import { cn } from '$lib/utils'
  import Skeleton from './skeleton.svelte'

  let {
    class: className = '',
    rows = 5,
    width = 250
  }: {
    class?: string
    rows?: number
    width?: number | string
  } = $props()

  const widthStyle = typeof width === 'number' ? `${width}px` : width
</script>

<div class={cn('space-y-2', className)}>
  {#each Array(rows) as _, i}
    <Skeleton
      class="h-4"
      style="width: {widthStyle}; max-width: {i === rows - 1 ? '80%' : '100%'}"
    />
  {/each}
</div>
