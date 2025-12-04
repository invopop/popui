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
      'h-8 w-full rounded-lg border px-2 py-1 text-base tracking-tight bg-background-default-default backdrop-blur-[2px] caret-foreground-accent',
      'placeholder:text-foreground-default-tertiary',
      'outline-none focus:ring-0',
      {
        'pointer-events-none bg-background-default-secondary border-border-default-default':
          disabled
      },
      {
        'text-foreground-critical border-border-critical-bold caret-foreground-critical': errorText
      },
      {
        'text-foreground border-border-default-secondary hover:border-border-default-secondary-hover focus:border-border-selected-bold focus:shadow-active':
          !errorText && !disabled
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

<div class="flex flex-col gap-2">
  {#if label}
    <InputLabel {id} {label} />
  {/if}
  <input
    {id}
    bind:this={inputEl}
    bind:value
    type="text"
    class={inputStyles}
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
</div>
