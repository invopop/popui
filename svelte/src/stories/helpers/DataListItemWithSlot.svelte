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
</script>

{#if useSlot}
  <DataListItem {label} {value} {vertical} onCopy={copyHandler} onLink={linkHandler}>
    <div class="flex flex-col gap-2 w-max">
      <div class="font-medium">Multi-line content example with long text that extends beyond the container</div>
      <div class="text-sm text-foreground-default-secondary">
        This is a taller slot content that demonstrates horizontal scrolling when content is wider than the available space.
      </div>
    </div>
  </DataListItem>
{:else}
  <DataListItem {label} {value} {monospaced} {vertical} onCopy={copyHandler} onLink={linkHandler} />
{/if}
