<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Search, Slash } from '@invopop/ui-icons'
  import { onDestroy, onMount } from 'svelte'
  import clsx from 'clsx'
  import ShortcutWrapper from './ShortcutWrapper.svelte'
  import { GLOBAL_SEARCH_KEY } from './constants.js'
  import { isInputFocused } from './helpers.js'
  import type { GlobalSearchProps } from './types'

  let { collapsed = false, onOpen }: GlobalSearchProps = $props()

  let styles = $derived(
    clsx({
      'space-x-1 w-full': !collapsed
    })
  )

  function onKeyDown(event: KeyboardEvent) {
    if (event.key !== GLOBAL_SEARCH_KEY) {
      return
    }

    // We allow to type the GLOBAL SEARCH KEY on text fields
    if (isInputFocused()) {
      return
    }

    onOpen?.()
  }

  onMount(() => {
    window.addEventListener('keydown', onKeyDown)
  })

  onDestroy(() => {
    window.removeEventListener('keydown', onKeyDown)
  })
</script>

<button
  class="cursor-pointer {styles} flex items-center border pl-1.5 py-1.5 pr-2 border-white-10 bg-neutral-800/10 rounded-md"
  onclick={() => onOpen?.()}
>
  <Icon src={Search} class="w-4 h-4 text-white-70" />
  {#if !collapsed}
    <span class="text-white-40 text-sm flex-1 text-left tracking-normal">Search</span>
    <ShortcutWrapper>
      <Icon src={Slash} class="w-3 h-3 text-white-70" />
    </ShortcutWrapper>
  {/if}
</button>
