<script lang="ts">
  import { cn } from '$lib/utils'
  import SkeletonAvatar from './skeleton-avatar.svelte'
  import SkeletonList from './skeleton-list.svelte'

  let {
    class: className = '',
    avatarSize = 48,
    lines = 2,
    width = 250
  }: {
    class?: string
    avatarSize?: number
    lines?: number
    width?: number
  } = $props()
</script>

<div class={cn('flex items-center space-x-4', className)}>
  <SkeletonAvatar size={avatarSize} />
  <SkeletonList rows={lines} width={width} />
</div>
