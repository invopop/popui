<script lang="ts">
  import clsx from 'clsx'
  import { createSwitch } from 'svelte-headlessui'
  import type { InputToggleProps } from './types'
  import { cn } from './utils.js'
  const sw = createSwitch({ label: 'Set Preference' })

  let {
    id = Math.random().toString(36).slice(2, 7),
    label = '',
    checked = $bindable(false),
    onchange,
    class: className = ''
  }: InputToggleProps = $props()

  $effect(() => {
    $sw.checked = checked
  })

  let toggleStyles = $derived(
    clsx(
      'relative inline-flex h-5 w-[30px] shrink-0 items-center rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0',
      {
        'bg-background-default-tertiary': !$sw.checked,
        'bg-background-accent': $sw.checked
      }
    )
  )

  let circleStyles = $derived(
    clsx(
      'pointer-events-none inline-block size-4 transform rounded bg-icon-inverse-bold transition duration-200 ease-in-out',
      {
        'translate-x-[2px]': !$sw.checked,
        'translate-x-[12px]': $sw.checked
      }
    )
  )

  function handleChange() {
    onchange?.($sw.checked)
    checked = $sw.checked
  }
</script>

<label for={id} class={cn("inline-flex items-center gap-2 cursor-pointer", className)}>
  <button {id} class={toggleStyles} use:sw.toggle onclick={handleChange}>
    <span class="sr-only">Use setting</span>
    <span aria-hidden="true" class={circleStyles}></span>
  </button>
  {#if label}
    <span class="text-base text-foreground">{label}</span>
  {/if}
</label>
