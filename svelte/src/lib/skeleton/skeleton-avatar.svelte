<script lang="ts">
  import { cn } from '$lib/utils'
  import Skeleton from './skeleton.svelte'

  let {
    class: className = '',
    size = 48
  }: {
    class?: string
    size?: number
  } = $props()
</script>

<Skeleton class={cn('rounded-lg flex-shrink-0', className)} style="height: {size}px; width: {size}px" />
