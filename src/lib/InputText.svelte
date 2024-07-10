<script lang="ts">
  import clsx from 'clsx'
  import { createEventDispatcher, onMount } from 'svelte'
  import InputLabel from './InputLabel.svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import InputError from './InputError.svelte'

  export let id = ''
  export let label = ''
  export let placeholder = ''
  export let errorText = ''
  export let disabled = false
  export let value: string | number = ''
  export let focusOnLoad = false

  let inputEl: HTMLInputElement
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
      'text-danger-500 border-danger-400 outline-danger-400': errorText
    },
    {
      'border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-none ui-input':
        !errorText
    }
  )

  function handleInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    debounce(target)
  }

  onMount(() => {
    if (!focusOnLoad) return

    inputEl.focus()
  })
</script>

{#if label}
  <InputLabel {id} {label} />
{/if}
<input
  bind:this={inputEl}
  bind:value
  type="text"
  class="{inputStyles} py-1.5 px-2.5 border w-full rounded-md placeholder:text-neutral-500 text-base tracking-tight"
  {placeholder}
  readonly={disabled}
  on:input={handleInput}
  on:focus={() => dispatch('focus')}
  on:blur={(e) => dispatch('blur', e)}
/>
{#if errorText}
  <InputError {errorText} />
{/if}

<style>
  .ui-input {
    caret-color: var(--workspace-accent-color, #169958);
  }
  .ui-input:focus {
    box-shadow: 0px 0px 0px 2px
      color-mix(in lab, transparent 88%, var(--workspace-accent-color, #169958));
    border-color: var(--workspace-accent-color, #169958);
  }
</style>
