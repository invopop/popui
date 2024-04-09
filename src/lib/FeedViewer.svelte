<script lang="ts">
  import FeedItem from './FeedItem.svelte'
  import type { FeedItemProps } from './types.js'

  export let items: FeedItemProps[] = []
</script>

<div>
  {#each items as item, i (i)}
    <FeedItem {...item} hasNext={i < items.length - 1} on:open on:copied on:view />
  {/each}
</div>
