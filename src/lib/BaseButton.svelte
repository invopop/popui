<script lang="ts">
  import clsx from 'clsx'
  import type { ButtonType, IconPosition, IconTheme } from '$lib/types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher, onMount } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'

  const dispatch = createEventDispatcher()

  export let icon: IconSource | string | undefined = undefined
  export let iconTheme: IconTheme = 'default'
  export let iconPosition: IconPosition = 'left'
  export let type: ButtonType = 'default'
  export let disabled = false
  export let small = false

  let resolvedIcon: IconSource | undefined

  $: buttonStyles = clsx(
    { 'opacity-30 pointer-events-none': disabled },
    { 'flex-row-reverse space-x-reverse': iconPosition === 'right' },
    { 'bg-white': type === 'default' },
    { 'bg-accent-500': type === 'primary' },
    { 'bg-neutral-100': type === 'secondary' },
    { 'bg-danger-500': type === 'danger' },
    { 'text-sm': small },
    { 'text-base': !small },
    { 'px-2 pt-[2.5px] pb-[3.5px]': small && $$slots.default },
    { 'px-3 py-1.25': !small && $$slots.default },
    { 'p-2': !$$slots.default },
    { 'text-white': ['primary', 'danger', 'dark'].includes(type) },
    { 'text-neutral-800': ['default', 'secondary'].includes(type) },
    { 'border-white-10 hover:border-white-20 focus:border-white-40': type === 'dark' },
    { 'border-neutral-200 hover:border-neutral-300 focus:border-neutral-400': type !== 'dark' }
  )

  onMount(async () => {
    if (!icon) return

    if (typeof icon !== 'string') {
      resolvedIcon = icon
      return
    }

    try {
      const { [toPascalCase(icon)]: i } = await import('@steeze-ui/heroicons')
      resolvedIcon = i
    } catch (error) {
      console.log(error)
    }
  })

  function toPascalCase(text: string) {
    return text.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, '').toUpperCase())
  }

  function handleClick(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    dispatch('click')

    dispatchWcEvent((event as PointerEvent).target, 'click')
  }
</script>

<button
  type="button"
  {disabled}
  class="{buttonStyles} flex items-center justify-center rounded-xl border font-medium space-x-1 font-sans"
  {...$$restProps}
  on:click={handleClick}
>
  {#if resolvedIcon}
    <Icon src={resolvedIcon} theme={iconTheme} class="h-5 w-5" />
  {/if}
  {#if $$slots.default}
    <span><slot /></span>
  {/if}
</button>
