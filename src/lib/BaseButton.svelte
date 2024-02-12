<script lang="ts">
  import clsx from 'clsx'
  import type { ButtonVariant, IconPosition, IconTheme } from '$lib/types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import { resolveIcon } from './helpers.js'
  import ShortcutWrapper from './ShortcutWrapper.svelte'

  const dispatch = createEventDispatcher()

  export let icon: IconSource | string | undefined = undefined
  export let iconTheme: IconTheme = 'default'
  export let iconPosition: IconPosition = 'left'
  export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button'
  export let variant: ButtonVariant = 'default'
  export let disabled = false
  export let small = false
  export let dangerIcon = false
  export let shortcut = false
  export let fullwidth = false

  let resolvedIcon: IconSource | undefined

  $: {
    resolveIcon(icon).then((icon) => {
      resolvedIcon = icon
    })
  }

  $: buttonStyles = clsx(
    { 'w-full': fullwidth },
    { 'opacity-30 pointer-events-none': disabled },
    { 'flex-row-reverse space-x-reverse': iconPosition === 'right' },
    { 'bg-white': variant === 'default' },
    { 'bg-accent-500': variant === 'primary' },
    { 'bg-neutral-100': variant === 'secondary' },
    { 'bg-danger-500': variant === 'danger' },
    { 'text-sm': small },
    { 'text-base': !small },
    { 'px-2 pt-[2.5px] pb-[3.5px]': small && $$slots.default },
    { 'p-1': small && !$$slots.default },
    { 'px-3': !small && $$slots.default && !icon },
    { 'pl-2 pr-3': !small && $$slots.default && icon && iconPosition === 'left' },
    { 'pl-3 pr-2': !small && $$slots.default && icon && iconPosition === 'right' },
    { 'py-1.25': !small && $$slots.default },
    { 'p-1.5': !small && !$$slots.default },
    { 'text-white': ['primary', 'danger', 'dark'].includes(variant) },
    { 'text-neutral-800': ['default', 'secondary'].includes(variant) },
    { 'border border-white-10 hover:border-white-20 focus:border-white-40': variant === 'dark' },
    {
      'border border-neutral-200 hover:border-neutral-300 focus:border-neutral-400':
        variant === 'default'
    },
    { 'gap-1': icon && $$slots.default }
  )

  $: iconStyles = clsx(
    {
      'text-neutral-500':
        ['default', 'secondary'].includes(variant) && $$slots.default && !dangerIcon
    },
    {
      'text-neutral-800':
        ['default', 'secondary'].includes(variant) && !$$slots.default && !dangerIcon
    },
    {
      'text-white-70': !['default', 'secondary'].includes(variant) && $$slots.default && !dangerIcon
    },
    {
      'text-white': !['default', 'secondary'].includes(variant) && !$$slots.default && !dangerIcon
    },
    { 'text-danger-500': dangerIcon },
    { 'h-4 w-4': shortcut },
    { 'h-4 w-4': shortcut || small },
    { 'h-5 w-5': !shortcut && !small }
  )

  $: overlayClasses = clsx({
    'group-hover:bg-black/[.16] group-active:bg-black/[.32]': [
      'primary',
      'danger',
      'dark'
    ].includes(variant),
    'group-hover:bg-black/[.04] group-active:bg-black/[.12]': ['secondary'].includes(variant)
  })

  function handleClick(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    dispatch('click')

    dispatchWcEvent((event as PointerEvent).target, 'click')
  }
</script>

<button
  {type}
  {disabled}
  class="{buttonStyles} flex items-center justify-center rounded font-medium font-sans relative group tracking-tight"
  {...$$restProps}
  on:click={handleClick}
>
  <span class="{overlayClasses} absolute inset-0 rounded" />
  {#if resolvedIcon}
    {#if shortcut}
      <ShortcutWrapper>
        <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} z-10" />
      </ShortcutWrapper>
    {:else}
      <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} z-10" />
    {/if}
  {/if}
  {#if $$slots.default}
    <span class="z-10"><slot /></span>
  {/if}
</button>
