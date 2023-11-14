<script lang="ts">
  import clsx from 'clsx'
  import type { ButtonVariant, IconPosition, IconTheme } from '$lib/types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher, onMount } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import { resolveIcon } from './helpers.js'

  const dispatch = createEventDispatcher()

  export let icon: IconSource | string | undefined = undefined
  export let iconTheme: IconTheme = 'default'
  export let iconPosition: IconPosition = 'left'
  export let variant: ButtonVariant = 'default'
  export let disabled = false
  export let small = false

  let resolvedIcon: IconSource | undefined

  $: buttonStyles = clsx(
    { 'opacity-30 pointer-events-none': disabled },
    { 'flex-row-reverse space-x-reverse': iconPosition === 'right' },
    { 'bg-white': variant === 'default' },
    { 'bg-accent-500': variant === 'primary' },
    { 'bg-neutral-100': variant === 'secondary' },
    { 'bg-danger-500': variant === 'danger' },
    { 'text-sm': small },
    { 'text-base': !small },
    { 'px-2 pt-[2.5px] pb-[3.5px]': small && $$slots.default },
    { 'px-3': !small && $$slots.default && !icon },
    { 'pl-2 pr-3': !small && $$slots.default && icon && iconPosition === 'left' },
    { 'pl-3 pr-2': !small && $$slots.default && icon && iconPosition === 'right' },
    { 'py-1.25': !small && $$slots.default },
    { 'p-2': !$$slots.default },
    { 'text-white': ['primary', 'danger', 'dark'].includes(variant) },
    { 'text-neutral-800': ['default', 'secondary'].includes(variant) },
    { 'border-white-10 hover:border-white-20 focus:border-white-40': variant === 'dark' },
    { 'border-neutral-200 hover:border-neutral-300 focus:border-neutral-400': variant !== 'dark' }
  )

  $: iconStyles = clsx(
    { 'text-neutral-500': ['default', 'secondary'].includes(variant) },
    { 'text-white-70': !['default', 'secondary'].includes(variant) }
  )

  onMount(async () => {
    resolvedIcon = await resolveIcon(icon)
  })

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
  class="{buttonStyles} flex items-center justify-center rounded border font-medium space-x-1 font-sans"
  {...$$restProps}
  on:click={handleClick}
>
  {#if resolvedIcon}
    <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} h-5 w-5" />
  {/if}
  {#if $$slots.default}
    <span><slot /></span>
  {/if}
</button>
