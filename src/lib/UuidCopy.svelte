<script lang="ts">
  import { Duplicate } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import clsx from 'clsx'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let uuid = ''
  export let small = false
  export let dark = false
  export let rightAlign = false
  export let prefixLength = 7
  export let suffixLength = 12
  export let full = false

  function shortenString(inputString: string, prefixLength: number, suffixLength: number) {
    if (inputString.length <= prefixLength + suffixLength) {
      return inputString // Return the whole string if it's too short
    }

    const prefix = inputString.substring(0, prefixLength)
    const suffix = inputString.substring(inputString.length - suffixLength)

    return prefix + '...' + suffix
  }

  $: formattedUuid = full ? uuid : shortenString(uuid, prefixLength, suffixLength)
  $: styles = clsx({
    'justify-end w-full': rightAlign,
    'text-sm': small,
    'text-base': !small,
    'text-neutral-800 font-medium': dark,
    'text-neutral-500': !dark
  })
</script>

<button
  class="{styles} relative flex items-center justify-between w-full space-x-1"
  on:click|stopPropagation={async () => {
    await navigator.clipboard.writeText(uuid)
    dispatch('copied', uuid)
  }}
>
  <span class="tracking-wide tabular-nums slashed-zero">
    {formattedUuid}
  </span>
  <div class="p-1">
    <Icon src={Duplicate} class="w-4 h-4 text-neutral-500" />
  </div>
</button>
