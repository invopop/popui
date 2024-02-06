<script lang="ts">
  import clsx from 'clsx'
  import { createEventDispatcher } from 'svelte'
  import InputLabel from './InputLabel.svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import InputError from './InputError.svelte'

  export let id = ''
  export let label = ''
  export let placeholder = ''
  export let errorText = ''
  export let disabled = false
  export let value: string | number = ''

  let timer: ReturnType<typeof setTimeout>

  const dispatch = createEventDispatcher()

  const debounce = (target: HTMLInputElement) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch('input', target.value)
      dispatchWcEvent(target, 'input', target.value)
    }, 750)
  }

  $: inputStyles = clsx(
    { 'pointer-events-none bg-neutral-50': disabled },
    {
      'bg-danger-50 text-danger-500 border-danger-400 outline-danger-400': errorText
    },
    {
      'border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-accent-400': !errorText
    }
  )

  function handleInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    debounce(target)
  }
</script>

{#if label}
  <InputLabel {id} {label} />
{/if}
<input
  bind:value
  type="text"
  class="{inputStyles} py-1.25 px-3 border w-full rounded placeholder-neutral-400 text-base caret-accent-500"
  {placeholder}
  readonly={disabled}
  on:input={handleInput}
  on:focus={() => dispatch('focus')}
  on:blur={(e) => dispatch('blur', e)}
/>
{#if errorText}
  <InputError {errorText} />
{/if}
