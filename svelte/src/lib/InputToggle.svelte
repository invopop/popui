<script lang="ts">
  import clsx from 'clsx'
  import { createSwitch } from 'svelte-headlessui'
  import type { InputToggleProps } from './types'
  const sw = createSwitch({ label: 'Set Preference' })

  let {
    id = Math.random().toString(36).slice(2, 7),
    label = '',
    checked = $bindable(false),
    onchange
  }: InputToggleProps = $props()

  $effect(() => {
    $sw.checked = checked
  })

  let togleStyles = $derived(
    clsx({ 'bg-gray-200': !$sw.checked }, { 'bg-workspace-accent': $sw.checked })
  )

  function handleChange() {
    onchange?.($sw.checked)
    checked = $sw.checked
  }
</script>

<label for={id} class="flex w-full items-center justify-between space-x-2">
  {#if label}
    <span class="text-base text-neutral-500">{label}</span>
  {/if}
  <button
    {id}
    class="{togleStyles} relative inline-flex h-5 w-8 flex-shrink-0 cursor-pointer rounded-md border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-offset-0"
    use:sw.toggle
    onclick={handleChange}
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="{$sw.checked
        ? 'translate-x-3'
        : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded bg-white shadow ring-0 transition duration-200 ease-in-out"
    ></span>
  </button>
</label>
