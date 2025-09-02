<script lang="ts">
  import TagStatus from '../../lib/TagStatus.svelte'
  import DataListItem from '../../lib/DataListItem.svelte'

  interface Props {
    useSlot?: boolean;
    label?: string;
    value?: string;
    monospaced?: boolean;
    monospacedNums?: boolean;
  }

  let {
    useSlot = false,
    label = '',
    value = '',
    monospaced = false,
    monospacedNums = false
  }: Props = $props();
</script>

{#if useSlot}
  <DataListItem {label} {value}>
    <TagStatus status="green" label="Closed" />
  </DataListItem>
{:else}
  <DataListItem {label} {value} {monospaced} {monospacedNums} />
{/if}
