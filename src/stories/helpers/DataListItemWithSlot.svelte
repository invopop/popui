<script lang="ts">
  import TagStatus from '$lib/TagStatus.svelte'
  import DataListItem from '../../lib/DataListItem.svelte'

  export let useSlot = false
  export let label = ''
  export let value = ''
</script>

{#if useSlot}
  <DataListItem {label} {value}>
    <TagStatus status="green" label="Closed" />
  </DataListItem>
{:else}
  <DataListItem {label} {value} />
{/if}
