<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'

  export let checked = false

  const dispatch = createEventDispatcher()

  function updateInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    checked = target.checked

    dispatch('change', checked)

    dispatchWcEvent(target, 'change', checked)
  }
</script>

<input
  type="checkbox"
  {checked}
  class="form-checkbox w-5 h-5 color-checkbox-accent rounded border border-neutral-200 focus:ring-0 focus:ring-offset-0"
  on:change={updateInput}
/>

<style>
  .color-checkbox-accent,
  .color-checkbox-accent:focus {
    color: var(--workspace-accent-color, #169958);
  }
</style>
