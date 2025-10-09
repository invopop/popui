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
  export let notification = false

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
    { 'bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300': variant === 'secondary' },
    { 'bg-danger-500': variant === 'danger' },
    { 'bg-warning-500': variant === 'warning' },
    { 'text-sm rounded': small },
    { 'text-base rounded-md': !small },
    { 'p-1': small && !$$slots.default },
    { 'p-1.5': !small && !big && !$$slots.default },
    { 'p-2': big && !$$slots.default },
    { 'px-3': big && $$slots.default && !icon },
    { 'px-2': !big && $$slots.default && !icon },
    { 'pl-2 pr-2.5': big && $$slots.default && icon && iconPosition === 'left' },
    { 'pl-2.5 pr-2': big && $$slots.default && icon && iconPosition === 'right' },
    { 'pl-1.5 pr-2': !big && $$slots.default && icon && iconPosition === 'left' },
    { 'pl-2 pr-1.5': !big && $$slots.default && icon && iconPosition === 'right' },
    { 'py-1.5': big && $$slots.default },
    { 'py-1': !big && $$slots.default },
    { 'text-white': ['primary', 'danger', 'dark', 'warning'].includes(variant) },
    { 'text-neutral-800': ['default', 'secondary', 'outline'].includes(variant) },
    { 'border border-white-10 hover:border-white-20 active:border-white-40': variant === 'dark' },
    {
      'border border-neutral-200 hover:bg-neutral-100 active:border-neutral-300 active:bg-neutral-200':
        variant === 'default'
    },
    {
      'border border-neutral-800/10 hover:bg-neutral-800/5 active:border-neutral-800/20 active:bg-neutral-800/10':
        variant === 'outline'
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
    'group-hover:bg-black/[.16] group-active:bg-black/[.32]': [
      'primary',
      'danger',
      'warning'
    ].includes(variant)
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
    <div class="relative">
      {#if shortcut}
        <ShortcutWrapper>
          <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} h-3 w-3 z-10" />
        </ShortcutWrapper>
      {:else}
        <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} h-4 w-4 z-10" />
      {/if}
      {#if notification}
        <span class="absolute top-0 right-0 w-1.5 h-1.5 bg-danger-500 rounded-full z-20" />
      {/if}
    </div>
  {/if}
  {#if $$slots.default}
    <span class="z-10"><slot /></span>
  {/if}
</button>
