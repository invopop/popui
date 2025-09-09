<script lang="ts">
  import clsx from 'clsx'
  import { onMount } from 'svelte'
  import InputLabel from './InputLabel.svelte'
  import InputError from './InputError.svelte'
  import type { InputTextProps } from './types'

  let {
    id = Math.random().toString(36).slice(2, 7),
    label = '',
    placeholder = '',
    errorText = '',
    disabled = false,
    value = $bindable(''),
    focusOnLoad = false,
    oninput,
    onkeydown,
    onfocus,
    onblur,
    ...rest
  }: InputTextProps = $props()

  let inputEl: HTMLInputElement | undefined = $state()
  let timer: ReturnType<typeof setTimeout>

  const debounce = (target: HTMLInputElement) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      oninput?.(target.value)
    }, 750)
  }

  let inputStyles = $derived(
    clsx(
      { 'pointer-events-none bg-neutral-50': disabled },
      {
        'text-danger-500 border-danger-400 outline-danger-400': errorText
      },
      {
        'border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-none caret-workspace-accent focus:border-workspace-accent focus:shadow-active':
          !errorText
      }
    )
  )

  function handleInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    debounce(target)
  }

  onMount(() => {
    if (!focusOnLoad) return

    inputEl?.focus()
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
  {onfocus}
  {onblur}
  {onkeydown}
/>
{#if errorText}
  <InputError {errorText} />
{/if}
