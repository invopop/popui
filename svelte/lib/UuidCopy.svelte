<script lang="ts">
  import { Duplicate, ExternalLink } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import clsx from 'clsx'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let uuid = ''
  export let small = false
  export let dark = false
  export let rightAlign = false
  export let prefixLength = 4
  export let suffixLength = 4
  export let full = false
  export let compact = false
  export let link = false

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
    'justify-end': rightAlign,
    'text-sm': small,
    'text-base': !small,
    'text-neutral-800': dark,
    'text-neutral-500': !dark,
    'justify-between': !compact,
    'w-full': full,
    'border border-neutral-800/10 rounded-md pl-2.5 pr-2 py-[5px]': !full
  })
</script>

<div class="{styles} relative inline-flex items-center space-x-1 text-left whitespace-nowrap">
  <button
    class="tracking-wide font-mono text-base"
    on:click|stopPropagation={async () => {
      await navigator.clipboard.writeText(uuid)
      dispatch('copied', uuid)
    }}
  >
    {formattedUuid}
  </button>
  <button
    class="p-1"
    on:click|stopPropagation={async () => {
      await navigator.clipboard.writeText(uuid)
      dispatch(link ? 'link' : 'copied', uuid)
    }}
  >
    <Icon src={link ? ExternalLink : Duplicate} class="w-4 h-4 text-neutral-500" />
  </button>
</div>
