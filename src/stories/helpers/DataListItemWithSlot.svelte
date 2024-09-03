<script lang="ts">
  import TagStatus from '$lib/TagStatus.svelte'
  import DataListItem from '../../lib/DataListItem.svelte'

  export let useSlot = false
  export let label = ''
  export let value = ''
  export let monospaced = false
  export let monospacedNums = false
</script>

{#if useSlot}
  <DataListItem {label} {value}>
    <TagStatus status="green" label="Closed" />
  </DataListItem>
{:else}
  <DataListItem {label} {value} {monospaced} {monospacedNums} />
{/if}
