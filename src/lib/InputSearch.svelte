<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  let timer: ReturnType<typeof setTimeout>

  const dispatch = createEventDispatcher()

  const debounce = (v: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch('input', v)
    }, 750)
  }

  export let placeholder = ''

  let input: HTMLInputElement

  export const toggle = () => {
    input === document.activeElement ? input.blur() : input.focus()
  }

  let value = ''
  export let shortcut = ''

  export const clear = () => {
    value = ''
  }

  $: shortcutKeys = shortcut.split('')
</script>

<div class="relative flex items-center">
  <input
    bind:this={input}
    bind:value
    type="search"
    class="py-1.25 pl-7 border border-neutral-200 hover:border-neutral-300 w-full rounded-xl text-neutral-800 placeholder:text-neutral-400 text-base outline-accent-400"
    style:padding-right={`${shortcutKeys.length * 15 + 12}px`}
    {placeholder}
    on:input={(event) => debounce(event.target.value)}
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
