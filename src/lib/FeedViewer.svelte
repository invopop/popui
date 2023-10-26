<script lang="ts">
  import FeedItem from './FeedItem.svelte'
  import type { FeedItemProps } from './types.js'

  export let items: FeedItemProps[] = []
</script>

<div>
  {#each items as item, i (i)}
    <FeedItem {...item} hasPrev={i > 0} hasNext={i < items.length - 1} />
  {/each}
</div>
