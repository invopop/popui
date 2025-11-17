<script lang="ts">
  import clsx from 'clsx'
  import BaseFlag from './BaseFlag.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { ProfileAvatarProps } from './types'

  let {
    name = '',
    variant = 'sm',
    dark = false,
    picture = $bindable(''),
    country = '',
    icon
  }: ProfileAvatarProps = $props()

  let containerStyles = $derived(
    clsx(
      'overflow-clip relative flex items-center justify-center after:content-[""] after:absolute after:inset-0 after:pointer-events-none after:rounded-[inherit]',
      { 'size-4 rounded': variant === 'xs' },
      { 'size-5 rounded-md': variant === 'sm' },
      { 'size-7 rounded-md': variant === 'md' },
      { 'size-8 rounded-lg': variant === 'lg' },
      { 'size-10 rounded-lg': variant === 'xl' },
      {
        'bg-background after:shadow-avatar': !dark
      },
      { 'bg-background-inverse after:shadow-avatar-inverse': dark }
    )
  )

  let textStyles = $derived(
    clsx(
      'font-sans font-medium tracking-tight',
      { 'text-sm leading-4': variant === 'xs' || variant === 'sm' },
      { 'text-base leading-5': variant === 'md' },
      { 'text-lg leading-6': variant === 'lg' },
      { 'text-xl leading-7': variant === 'xl' },
      { 'text-foreground-default-secondary': !dark },
      { 'text-foreground-inverse-secondary': dark }
    )
  )

  let iconStyles = $derived(
    clsx(
      { 'size-3': variant === 'xs' || variant === 'sm' },
      { 'size-4': variant === 'md' },
      { 'size-[25px]': variant === 'lg' || variant === 'xl' },
      { 'text-icon-default-default': !dark },
      { 'text-icon-inverse-default': dark }
    )
  )
</script>

<div class={containerStyles}>
  {#if picture}
    <img
      src={picture}
      alt={name}
      class="absolute inset-0 size-full object-cover bg-background-default-bold"
      onerror={() => {
        picture = ''
      }}
    />
  {:else if icon}
    <Icon src={icon} class={iconStyles} />
  {:else}
    <span class={textStyles}>{name?.charAt(0)?.toUpperCase()}</span>
  {/if}

  {#if country}
    <div class="absolute -bottom-0.5 -right-0.5">
      <BaseFlag {country} />
    </div>
  {/if}
</div>
