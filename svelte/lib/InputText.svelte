<script lang="ts">
  import { createBubbler } from 'svelte/legacy';

  const bubble = createBubbler();
  import clsx from 'clsx'
  import { createEventDispatcher, onMount } from 'svelte'
  import InputLabel from './InputLabel.svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import InputError from './InputError.svelte'

  interface Props {
    id?: any;
    label?: string;
    placeholder?: string;
    errorText?: string;
    disabled?: boolean;
    value?: string | number;
    focusOnLoad?: boolean;
    [key: string]: any
  }

  let {
    id = Math.random().toString(36).slice(2, 7),
    label = '',
    placeholder = '',
    errorText = '',
    disabled = false,
    value = $bindable(''),
    focusOnLoad = false,
    ...rest
  }: Props = $props();

  let inputEl: HTMLInputElement = $state()
  let timer: ReturnType<typeof setTimeout>

  const dispatch = createEventDispatcher()

  const debounce = (target: HTMLInputElement) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch('input', target.value)
      dispatchWcEvent(target, 'input', target.value)
    }, 750)
  }

  let inputStyles = $derived(clsx(
    { 'pointer-events-none bg-neutral-50': disabled },
    {
      'text-danger-500 border-danger-400 outline-danger-400': errorText
    },
    {
      'border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-none caret-workspace-accent focus:border-workspace-accent focus:shadow-active':
        !errorText
    }
  ))

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
  {id}
  bind:this={inputEl}
  bind:value
  type="text"
  class="{inputStyles} py-1.5 px-2.5 border w-full rounded-md placeholder:text-neutral-500 text-base tracking-tight"
  {placeholder}
  readonly={disabled}
  {...rest}
  oninput={handleInput}
  onfocus={bubble('focus')}
  onblur={bubble('blur')}
  onkeydown={bubble('keydown')}
/>
{#if errorText}
  <InputError {errorText} />
{/if}
