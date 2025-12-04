<script lang="ts">
  import { Duplicate, ExternalLink } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import clsx from 'clsx'
  import type { UuidCopyProps } from './types'

  let {
    uuid = '',
    small = false,
    dark = false,
    rightAlign = false,
    prefixLength = 4,
    suffixLength = 4,
    full = false,
    compact = false,
    link = false,
    onCopied,
    onLinkClick
  }: UuidCopyProps = $props()

  function shortenString(inputString: string, prefixLength: number, suffixLength: number) {
    if (inputString.length <= prefixLength + suffixLength) {
      return inputString // Return the whole string if it's too short
    }

    const prefix = inputString.substring(0, prefixLength)
    const suffix = inputString.substring(inputString.length - suffixLength)

    return prefix + '...' + suffix
  }

  let formattedUuid = $derived(full ? uuid : shortenString(uuid, prefixLength, suffixLength))
  let styles = $derived(
    clsx({
      'justify-end': rightAlign,
      'text-sm': small,
      'text-base': !small,
      'text-foreground': dark,
      'text-foreground-default-secondary': !dark,
      'justify-between': !compact,
      'w-full': full,
      'border border-border rounded-md pl-2.5 pr-2 py-[5px]': !full
    })
  )

  async function handleClick(event: MouseEvent) {
    event.stopPropagation()
    await navigator.clipboard.writeText(uuid)
    onCopied?.(uuid)
  }

  async function handleIconClick(event: MouseEvent) {
    event.stopPropagation()
    await navigator.clipboard.writeText(uuid)
    if (link) {
      onLinkClick?.(uuid)
    } else {
      onCopied?.(uuid)
    }
  }
</script>

<div class="{styles} relative inline-flex items-center space-x-1 text-left whitespace-nowrap">
  <button class="tracking-wide font-mono text-base cursor-pointer" onclick={handleClick}>
    {formattedUuid}
  </button>
  <button class="p-1 cursor-pointer" onclick={handleIconClick}>
    <Icon src={link ? ExternalLink : Duplicate} class="w-4 h-4 text-foreground-default-secondary" />
  </button>
</div>
