<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'

  export let checked = false
  export let id = ''

  let el: HTMLInputElement

  const dispatch = createEventDispatcher()

  $: if (el && checked) {
    el.focus()
  }

  function updateInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    dispatch('change', target.checked)

    dispatchWcEvent(target, 'change', target.checked)
  }
</script>

<input
  bind:this={el}
  type="radio"
  {id}
  {checked}
  class="form-radio h-5 w-5 border-neutral-200 text-workspace-accent focus:ring-0 focus:ring-offset-0"
  on:change={updateInput}
/>
