<script lang="ts">
  import Skeleton from '$lib/skeleton/skeleton.svelte'
  import SkeletonAvatar from '$lib/skeleton/skeleton-avatar.svelte'
  import type { CellSkeletonProps } from '../data-table-types.js'

  let {
    isBoolean = false,
    loadingConfig = {},
    withPadding = false
  }: CellSkeletonProps = $props()

  const lines = $derived(loadingConfig.lines ?? 1)
  const showAvatar = $derived(loadingConfig.showAvatar ?? false)
  const avatarSize = $derived(loadingConfig.avatarSize ?? 32)
</script>

{#if isBoolean}
  <div class={withPadding ? 'px-3' : ''}>
    <Skeleton class="size-4" />
  </div>
{:else}
  <div class="flex items-center gap-3 w-full {withPadding ? 'px-3' : ''}">
    {#if showAvatar}
      <SkeletonAvatar size={avatarSize} />
    {/if}
    <div class="flex flex-col gap-2 flex-1">
      {#each Array(lines) as _, i}
        <Skeleton
          class="h-4 w-full"
          style="max-width: {i === lines - 1 && lines > 1 ? '80%' : '100%'}"
        />
      {/each}
    </div>
  </div>
{/if}
