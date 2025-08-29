<script lang="ts">
  import { stopPropagation } from 'svelte/legacy';

  import { createEventDispatcher } from 'svelte'
  import InputCheckbox from './InputCheckbox.svelte'

  const dispatch = createEventDispatcher()

  interface Props {
    checkboxButton?: HTMLButtonElement | undefined;
    checked?: boolean;
    hidden?: boolean;
    indeterminate?: boolean;
  }

  let {
    checkboxButton = $bindable(undefined),
    checked = false,
    hidden = false,
    indeterminate = false
  }: Props = $props();
</script>

<button
  role="checkbox"
  aria-checked={checked}
  bind:this={checkboxButton}
  class="absolute inset-0 h-full w-full flex items-center justify-center outline-none group cursor-default"
  onclick={stopPropagation(() => {
    dispatch('checked', !checked)
  })}
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
