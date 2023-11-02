<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'

  export let checked = false

  let rootEl: HTMLElement

  const dispatch = createEventDispatcher()

  function updateInput(event) {
    dispatch('change', event.target.checked)
    // We emit a different event to be listened in a web component
    // to differentiate to the outer DOM event
    dispatchWcEvent(rootEl, 'changed', event.target.checked)
  }
</script>

<input
  bind:this={rootEl}
  type="checkbox"
  {checked}
  class="form-checkbox w-5 h-5 text-accent-500 focus:text-accent-500 rounded-md border border-neutral-200 focus:ring-0 focus:ring-offset-0"
  on:change={updateInput}
/>
