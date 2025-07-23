<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import InputLabel from './InputLabel.svelte'
  import InputError from './InputError.svelte'
  import clsx from 'clsx'

  const dispatch = createEventDispatcher()

  export let id = Math.random().toString(36).slice(2, 7)
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
      'border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-none caret-workspace-accent focus:border-workspace-accent focus:shadow-active':
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
  {...$$restProps}
  on:input={handleInput}
/>

{#if errorText}
  <InputError {errorText} />
{/if}
