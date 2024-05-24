<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { Search } from '@invopop/ui-icons'

  const dispatch = createEventDispatcher()

  const debounce = (target: HTMLInputElement) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch('input', target.value)
      dispatchWcEvent(target, 'input', target.value)
    }, 750)
  }

  export let value = ''
  export let shortcut = ''
  export let placeholder = ''
  export let icon: IconSource = Search
  export let focusOnLoad = false

  let input: HTMLInputElement
  let timer: ReturnType<typeof setTimeout>

  export const toggle = () => {
    input === document.activeElement ? input.blur() : input.focus()
  }

  export const clear = () => {
    value = ''
  }

  $: shortcutKeys = shortcut.split('')

  function handleInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    debounce(target)
  }

  onMount(() => {
    if (!focusOnLoad) return

    input.focus()
  })
</script>

<div class="relative flex items-center">
  <input
    bind:this={input}
    bind:value
    type="search"
    class="py-[5px] pl-7 border border-neutral-200 hover:border-neutral-300 focus:border-accent-500 w-full rounded-md text-neutral-800 placeholder-neutral-500 text-base outline-none caret-accent-500 tracking-tight ui-input"
    style:padding-right={`${shortcutKeys.length * 15 + 12}px`}
    {placeholder}
    on:input={handleInput}
    on:focus={() => dispatch('focus')}
    on:blur={(e) => dispatch('blur', e)}
    on:click
  />
  <Icon src={icon} class="absolute text-neutral-500 w-4 h-4 left-2" />

  {#if shortcut}
    <div class="absolute top-1 right-0 flex py-1.5 pr-1.5 space-x-1">
      {#each shortcutKeys as key}
        <kbd
          class="w-4 h-4 flex justify-center items-center rounded-md border border-neutral-200 bg-neutral-100 font-sans text-sm text-neutral-500 font-semibold"
          >{key}</kbd
        >
      {/each}
    </div>
  {/if}
</div>

<style>
  .ui-input:focus {
    box-shadow: 0px 0px 0px 2px rgba(22, 153, 88, 0.12);
  }
</style>
