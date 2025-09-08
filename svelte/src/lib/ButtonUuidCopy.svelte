<script lang="ts">
  import { Duplicate } from '@invopop/ui-icons'
  import BaseButton from './BaseButton.svelte'
  import type { ButtonUuidCopyProps } from './types'

  let {
    uuid = '',
    prefixLength = 4,
    suffixLength = 4,
    full = false,
    disabled = false,
    oncopied
  }: ButtonUuidCopyProps = $props()

  function shortenString(inputString: string, prefixLength: number, suffixLength: number) {
    if (inputString.length <= prefixLength + suffixLength) {
      return inputString // Return the whole string if it's too short
    }

    const prefix = inputString.substring(0, prefixLength)
    const suffix = inputString.substring(inputString.length - suffixLength)

    return prefix + '...' + suffix
  }

  let formattedUuid = $derived(full ? uuid : shortenString(uuid, prefixLength, suffixLength))
</script>

<BaseButton
  {disabled}
  big
  icon={Duplicate}
  iconPosition="right"
  onclick={async () => {
    await navigator.clipboard.writeText(uuid)
    oncopied?.(uuid)
  }}
>
  <span class="font-mono text-neutral-500">{formattedUuid}</span>
</BaseButton>
