<script lang="ts">
  import { Duplicate } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'
  import BaseButton from './BaseButton.svelte'

  const dispatch = createEventDispatcher()

  export let uuid = ''
  export let prefixLength = 4
  export let suffixLength = 4
  export let full = false
  export let disabled = false

  function shortenString(inputString: string, prefixLength: number, suffixLength: number) {
    if (inputString.length <= prefixLength + suffixLength) {
      return inputString // Return the whole string if it's too short
    }

    const prefix = inputString.substring(0, prefixLength)
    const suffix = inputString.substring(inputString.length - suffixLength)

    return prefix + '...' + suffix
  }

  $: formattedUuid = full ? uuid : shortenString(uuid, prefixLength, suffixLength)
</script>

<BaseButton
  {disabled}
  big
  icon={Duplicate}
  iconPosition="right"
  on:click={async () => {
    await navigator.clipboard.writeText(uuid)
    dispatch('copied', uuid)
  }}
>
  <span class="font-mono text-neutral-500">{formattedUuid}</span>
</BaseButton>
