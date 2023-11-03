<script lang="ts">
  import clsx from 'clsx'
  import { createEventDispatcher } from 'svelte'
  import { createSwitch } from 'svelte-headlessui'
  import { dispatchWcEvent } from './wcdispatch.js'

  const dispatch = createEventDispatcher()
  const sw = createSwitch({ label: 'Set Preference' })

  let rootEl: HTMLElement

  export let checked = false

  $: $sw.checked = checked

  $: togleStyles = clsx({ 'bg-gray-200': !$sw.checked }, { 'bg-accent-500': $sw.checked })

  function handleChange() {
    dispatch('change', $sw.checked)
    dispatchWcEvent(rootEl, 'change', $sw.checked)
  }
</script>

<div bind:this={rootEl} class="flex w-full flex-col items-center justify-center">
  <button
    class=" {togleStyles} relative inline-flex h-5 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-offset-0"
    use:sw.toggle
    on:click={handleChange}
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="{$sw.checked
        ? 'translate-x-3'
        : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
    />
  </button>
</div>
