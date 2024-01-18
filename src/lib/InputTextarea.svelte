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
      'bg-danger-50 text-danger-500 border-danger-400 outline-danger-400': errorText
    },
    {
      'border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-accent-400': !errorText
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
  class="{inputStyles} py-1.25 px-3 border w-full rounded placeholder:text-neutral-400 text-base caret-accent-500"
  {disabled}
  {rows}
  on:input={handleInput}
/>

{#if errorText}
  <InputError {errorText} />
{/if}
