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

  const styles = $derived(
    clsx(
      'cursor-pointer flex items-center border border-border-inverse-default rounded-lg backdrop-blur-[20px]',
      {
        'gap-1 px-2 py-1.5 w-full hover:bg-background-selected-inverse': !collapsed,
        'p-1.5': collapsed
      }
    )
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

<button class={styles} onclick={() => onOpen?.()}>
  <Icon src={Search} class="size-4 text-foreground-inverse shrink-0" />
  {#if !collapsed}
    <span class="text-foreground-inverse-secondary text-base flex-1 text-left">Search</span>
    <ShortcutWrapper theme="navigation">
      <Icon src={Slash} class="size-3" />
    </ShortcutWrapper>
  {/if}
</button>
