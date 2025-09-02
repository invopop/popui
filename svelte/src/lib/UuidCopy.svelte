<script lang="ts">
  import { stopPropagation } from 'svelte/legacy';

  import { Duplicate, ExternalLink } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import clsx from 'clsx'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  interface Props {
    uuid?: string;
    small?: boolean;
    dark?: boolean;
    rightAlign?: boolean;
    prefixLength?: number;
    suffixLength?: number;
    full?: boolean;
    compact?: boolean;
    link?: boolean;
  }

  let {
    uuid = '',
    small = false,
    dark = false,
    rightAlign = false,
    prefixLength = 4,
    suffixLength = 4,
    full = false,
    compact = false,
    link = false
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
  let styles = $derived(clsx({
    'justify-end': rightAlign,
    'text-sm': small,
    'text-base': !small,
    'text-neutral-800': dark,
    'text-neutral-500': !dark,
    'justify-between': !compact,
    'w-full': full,
    'border border-neutral-800/10 rounded-md pl-2.5 pr-2 py-[5px]': !full
  }))
</script>

<div class="{styles} relative inline-flex items-center space-x-1 text-left whitespace-nowrap">
  <button
    class="tracking-wide font-mono text-base"
    onclick={stopPropagation(async () => {
      await navigator.clipboard.writeText(uuid)
      dispatch('copied', uuid)
    })}
  >
    {formattedUuid}
  </button>
  <button
    class="p-1"
    onclick={stopPropagation(async () => {
      await navigator.clipboard.writeText(uuid)
      dispatch(link ? 'link' : 'copied', uuid)
    })}
  >
    <Icon src={link ? ExternalLink : Duplicate} class="w-4 h-4 text-neutral-500" />
  </button>
</div>
