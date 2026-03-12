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
    vertical?: boolean
  }

  let {
    useSlot = false,
    label = '',
    value = '',
    monospaced = false,
    fullWidth = false,
    vertical = false,
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

  // Sample value for JSON display in slot
  const sampleValue = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    status: 'active',
    created: '2024-03-12T10:30:00Z',
    metadata: {
      source: 'api',
      version: '2.1.0'
    }
  }

  let isMonospaced = $derived(monospaced)
</script>

{#if useSlot}
  <DataListItem {label} {value} onCopy={copyHandler} onLink={linkHandler} vertical monospaced={isMonospaced}>
    <pre
      class="whitespace-pre text-foreground font-mono text-sm overflow-auto max-h-30 p-1 flex items-start">{JSON.stringify(
        sampleValue,
        null,
        2
      )}</pre>
  </DataListItem>
{:else}
  <DataListItem {label} {value} {monospaced} {vertical} onCopy={copyHandler} onLink={linkHandler} />
{/if}
