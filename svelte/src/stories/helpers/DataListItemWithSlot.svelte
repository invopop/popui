<script lang="ts">
  import TagStatus from '../../lib/TagStatus.svelte'
  import DataListItem from '../../lib/DataListItem.svelte'

  interface Props {
    useSlot?: boolean
    label?: string
    value?: string
    monospaced?: boolean
    fullWidth?: boolean
    onCopy?: boolean
    onLink?: boolean
  }

  let {
    useSlot = false,
    label = '',
    value = '',
    monospaced = false,
    fullWidth = false,
    onCopy,
    onLink
  }: Props = $props()

  const handleCopy = () => {
    console.log('Copy clicked')
  }

  const handleLink = () => {
    console.log('Link clicked')
  }

  let copyHandler = $derived(onCopy === true ? handleCopy : undefined)
  let linkHandler = $derived(onLink === true ? handleLink : undefined)
</script>

{#if useSlot}
  <DataListItem
    {label}
    {value}
    {fullWidth}
    onCopy={copyHandler}
    onLink={linkHandler}
  >
    <TagStatus status="green" label="Closed" />
  </DataListItem>
{:else}
  <DataListItem
    {label}
    {value}
    {monospaced}
    {fullWidth}
    onCopy={copyHandler}
    onLink={linkHandler}
  />
{/if}
