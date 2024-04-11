<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Search, Slash } from '@invopop/ui-icons'
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import clsx from 'clsx'
  import ShortcutWrapper from './ShortcutWrapper.svelte'

  const dispatch = createEventDispatcher()

  export let collapsed = false

  $: styles = clsx({
    'space-x-1 w-full': !collapsed
  })

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === '/') {
      open()
    }
  }

  function open() {
    dispatch('open')
  }

  onMount(() => {
    window.addEventListener('keydown', onKeyDown)
  })

  onDestroy(() => {
    window.removeEventListener('keydown', onKeyDown)
  })
</script>

<button
  class="{styles} flex items-center border pl-1.5 py-1.5 pr-2 border-white-10 bg-neutral-800/10 rounded-md"
  on:click={() => open()}
>
  <Icon src={Search} class="w-4 h-4 text-white-70" />
  {#if !collapsed}
    <span class="text-white-40 text-sm flex-1 text-left tracking-normal">Search</span>
    <ShortcutWrapper>
      <Icon src={Slash} class="w-3 h-3 text-white-70" />
    </ShortcutWrapper>
  {/if}
</button>
