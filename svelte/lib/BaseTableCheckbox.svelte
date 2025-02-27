<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import InputCheckbox from './InputCheckbox.svelte'

  const dispatch = createEventDispatcher()

  export let checkboxButton: HTMLButtonElement | undefined = undefined
  export let checked = false
  export let hidden = false
  export let indeterminate = false
</script>

<button
  role="checkbox"
  aria-checked={checked}
  bind:this={checkboxButton}
  class="absolute inset-0 h-full w-full flex items-center justify-center outline-none group cursor-default"
  on:click|stopPropagation={() => {
    dispatch('checked', !checked)
  }}
>
  <div class:invisible={hidden} class="group-hover:visible">
    <InputCheckbox
      {checked}
      {indeterminate}
      on:change={(event) => {
        dispatch('checked', event.detail)
      }}
    />
  </div>
</button>
