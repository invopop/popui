<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import InputLabel from './InputLabel.svelte'
  import InputError from './InputError.svelte'
  import clsx from 'clsx'

  const dispatch = createEventDispatcher()

  export let id = ''
  export let label = ''
  export let placeholder = ''
  export let errorText = ''
  export let disabled = false
  export let value: string | number = ''
  export let rows = 4

  $: inputStyles = clsx(
    { 'pointer-events-none bg-neutral-50': disabled },
    {
      'text-danger-500 border-danger-400 outline-danger-400': errorText
    },
    {
      'border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-none ui-textarea':
        !errorText
    }
  )

  function handleInput(event: Event) {
    value = (event.target as HTMLInputElement).value
    dispatch('input', value)
  }
</script>

<InputLabel {id} {label} />
<textarea
  {id}
  {placeholder}
  {value}
  class="{inputStyles} py-1.5 px-3 border w-full rounded placeholder-neutral-500 text-base tracking-tight"
  {disabled}
  {rows}
  on:input={handleInput}
/>

{#if errorText}
  <InputError {errorText} />
{/if}

<style>
  .ui-textarea {
    caret-color: var(--workspace-accent-color, #169958);
  }
  .ui-textarea:focus {
    box-shadow: 0px 0px 0px 2px
      color-mix(in lab, transparent 88%, var(--workspace-accent-color, #169958));
    border-color: var(--workspace-accent-color, #169958);
  }
</style>
