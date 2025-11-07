<script lang="ts">
  import InputLabel from './InputLabel.svelte'
  import InputError from './InputError.svelte'
  import clsx from 'clsx'
  import type { InputTextareaProps } from './types'

  let {
    id = Math.random().toString(36).slice(2, 7),
    label = '',
    placeholder = '',
    errorText = '',
    disabled = false,
    value = $bindable(''),
    rows = 4,
    oninput,
    ...rest
  }: InputTextareaProps = $props()

  let inputStyles = $derived(
    clsx(
      'w-full rounded-lg border px-2 py-1.5 text-base tracking-tight bg-background backdrop-blur-[2px] placeholder:text-foreground-default-tertiary outline-none focus:ring-0',
      {
        'pointer-events-none bg-background-default-secondary border-border': disabled
      },
      {
        'text-foreground-critical border-border-critical-bold': errorText
      },
      {
        'text-foreground border-border hover:border-border-default-secondary-hover focus:border-border-selected-bold focus:shadow-active':
          !errorText && !disabled
      }
    )
  )

  function handleInput(event: Event) {
    value = (event.target as HTMLInputElement).value
    oninput?.(value)
  }
</script>

<div class="flex flex-col gap-2">
  {#if label}
    <InputLabel {id} {label} />
  {/if}
  <textarea
    {id}
    {placeholder}
    {value}
    class={inputStyles}
    {disabled}
    {rows}
    {...rest}
    oninput={handleInput}
  ></textarea>
  {#if errorText}
    <InputError {errorText} />
  {/if}
</div>
