<script lang="ts">
  import FeedItem from './FeedItem.svelte'
  import type { FeedViewerProps } from './types.js'

  let { items = [], onView }: FeedViewerProps = $props()
</script>

<div>
  {#each items as item, i (i)}
    <FeedItem {...item} hasNext={i < items.length - 1} {onView} />
  {/each}
</div>
