<script lang="ts">
  import { Duplicate } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'
  import BaseButton from './BaseButton.svelte'

  const dispatch = createEventDispatcher()

  interface Props {
    uuid?: string;
    prefixLength?: number;
    suffixLength?: number;
    full?: boolean;
    disabled?: boolean;
  }

  let {
    uuid = '',
    prefixLength = 4,
    suffixLength = 4,
    full = false,
    disabled = false
  }: Props = $props();

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
  on:click={async () => {
    await navigator.clipboard.writeText(uuid)
    dispatch('copied', uuid)
  }}
>
  <span class="font-mono text-neutral-500">{formattedUuid}</span>
</BaseButton>
