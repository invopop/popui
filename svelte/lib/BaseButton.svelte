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
  export let big = false
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
    { 'bg-workspace-accent': variant === 'primary' },
    { 'bg-neutral-100 hover:bg-neutral-200 focus:bg-neutral-300': variant === 'secondary' },
    { 'bg-danger-500': variant === 'danger' },
    { 'text-sm rounded': small },
    { 'text-base rounded-md': !small },
    { 'p-1': small && !$$slots.default },
    { 'p-1.5': !small && !big && !$$slots.default },
    { 'p-2': big && !$$slots.default },
    { 'px-3': big && $$slots.default && !icon },
    { 'px-2': !big && $$slots.default && !icon },
    { 'pl-2 pr-2.5': big && $$slots.default && icon && iconPosition === 'left' },
    { 'pl-1.5 pr-2': big && $$slots.default && icon && iconPosition === 'right' },
    { 'pl-1.5 pr-2': !small && !big && $$slots.default && icon && iconPosition === 'left' },
    { 'pl-2 pr-1.5': !small && !big && $$slots.default && icon && iconPosition === 'right' },
    { 'py-1.5': big && $$slots.default },
    { 'py-1': !big && $$slots.default },
    { 'text-white': ['primary', 'danger', 'dark'].includes(variant) },
    { 'text-neutral-800': ['default', 'secondary'].includes(variant) },
    { 'border border-white-10 hover:border-white-20 focus:border-white-40': variant === 'dark' },
    {
      'border border-neutral-200 hover:bg-neutral-100 focus:border-neutral-300 focus:bg-neutral-200':
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
    { 'text-danger-500': dangerIcon }
  )

  $: overlayClasses = clsx({
    'rounded-md': !small,
    rounded: small,
    'group-hover:bg-black/[.16] group-active:bg-black/[.32]': ['primary', 'danger'].includes(
      variant
    )
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
  class="{buttonStyles} flex items-center justify-center font-medium font-sans relative group tracking-tight"
  {...$$restProps}
  on:click|stopPropagation={handleClick}
>
  <span class="{overlayClasses} absolute inset-0" />
  {#if resolvedIcon}
    {#if shortcut}
      <ShortcutWrapper>
        <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} h-4 w-4 z-10" />
      </ShortcutWrapper>
    {:else}
      <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} h-4 w-4 z-10" />
    {/if}
  {/if}
  {#if $$slots.default}
    <span class="z-10"><slot /></span>
  {/if}
</button>
