<script lang="ts">
  import clsx from 'clsx'
  import type { BaseButtonProps } from '$lib/types.ts'
  import { Icon } from '@steeze-ui/svelte-icon'
  import ShortcutWrapper from './ShortcutWrapper.svelte'

  let {
    icon,
    iconTheme = 'default',
    iconPosition = 'left',
    type = 'button',
    variant = 'default',
    disabled = false,
    small = false,
    big = false,
    dangerIcon = false,
    shortcut = false,
    fullwidth = false,
    notification = false,
    children,
    onclick,
    ...rest
  }: BaseButtonProps = $props()

  let buttonStyles = $derived(
    clsx(
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
      { 'p-1': small && !children },
      { 'p-1.5': !small && !big && !children },
      { 'p-2': big && !children },
      { 'px-3': big && children && !icon },
      { 'px-2': !big && children && !icon },
      { 'pl-2 pr-2.5': big && children && icon && iconPosition === 'left' },
      { 'pl-2.5 pr-2': big && children && icon && iconPosition === 'right' },
      { 'pl-1.5 pr-2': !big && children && icon && iconPosition === 'left' },
      { 'pl-2 pr-1.5': !big && children && icon && iconPosition === 'right' },
      { 'py-1.5': big && children },
      { 'py-1': !big && children },
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
      { 'gap-1': icon && children }
    )
  )

  let iconStyles = $derived(
    clsx(
      {
        'text-neutral-500': ['default', 'secondary'].includes(variant) && children && !dangerIcon
      },
      {
        'text-neutral-800': ['default', 'secondary'].includes(variant) && !children && !dangerIcon
      },
      {
        'text-white-70': !['default', 'secondary'].includes(variant) && children && !dangerIcon
      },
      {
        'text-white': !['default', 'secondary'].includes(variant) && !children && !dangerIcon
      },
      { 'text-danger-500': dangerIcon }
    )
  )

  let overlayClasses = $derived(
    clsx({
      'rounded-md': !small,
      rounded: small,
      'group-hover:bg-black/[.16] group-active:bg-black/[.32]': [
        'primary',
        'danger',
        'warning'
      ].includes(variant)
    })
  )

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    onclick?.(event)
  }
</script>

<button
  {type}
  {disabled}
  class="{buttonStyles} flex items-center justify-center font-medium font-sans relative group tracking-tight cursor-pointer"
  {...rest}
  onclick={handleClick}
>
  <span class="{overlayClasses} absolute inset-0"></span>
  {#if icon}
    <div class="relative">
      {#if shortcut}
        <ShortcutWrapper>
          <Icon src={icon} theme={iconTheme} class="{iconStyles} h-3 w-3 z-10" />
        </ShortcutWrapper>
      {:else}
        <Icon src={icon} theme={iconTheme} class="{iconStyles} h-4 w-4 z-10" />
      {/if}
      {#if notification}
        <span class="absolute top-0 right-0 w-1.5 h-1.5 bg-danger-500 rounded-full z-20"></span>
      {/if}
    </div>
  {/if}
  {#if children}
    <span class="z-10">{@render children?.()}</span>
  {/if}
</button>
