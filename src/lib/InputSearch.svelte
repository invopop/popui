<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'

  let timer: ReturnType<typeof setTimeout>

  const dispatch = createEventDispatcher()

  const debounce = (target: HTMLInputElement) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch('input', target.value)
      dispatchWcEvent(target, 'input', target.value)
    }, 750)
  }

  export let shortcut = ''
  export let placeholder = ''

  let input: HTMLInputElement
  let value = ''

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
</script>

<div class="relative flex items-center">
  <input
    bind:this={input}
    bind:value
    type="search"
    class="py-1.25 pl-7 border border-neutral-200 hover:border-neutral-300 w-full rounded-xl text-neutral-800 placeholder:text-neutral-400 text-base outline-accent-400 caret-accent-500"
    style:padding-right={`${shortcutKeys.length * 15 + 12}px`}
    {placeholder}
    on:input={handleInput}
    on:focus={() => dispatch('focus')}
    on:blur={(e) => dispatch('blur', e)}
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="absolute text-neutral-500 w-4 h-4 left-2 mt-px"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>

  {#if shortcut}
    <div class="absolute top-1 right-0 flex py-1.5 pr-1.5 space-x-1">
      {#each shortcutKeys as key}
        <kbd
          class="w-4 h-4 flex justify-center items-center rounded-md border border-neutral-200 bg-neutral-100 font-sans text-xs text-neutral-500 font-semibold"
          >{key}</kbd
        >
      {/each}
    </div>
  {/if}
</div>
