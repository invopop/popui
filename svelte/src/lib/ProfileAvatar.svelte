<script lang="ts">
  import clsx from 'clsx'
  import BaseFlag from './BaseFlag.svelte'
  import { ProfileAvatarProps } from './types'

  let {
    name = '',
    small = false,
    large = false,
    dark = false,
    picture = $bindable(''),
    country = ''
  }: ProfileAvatarProps = $props()

  let avatarStyles = $derived(
    clsx(
      { 'text-sm': !large },
      { 'h-4 w-4': small },
      { 'h-5 w-5': !large && !small },
      { 'h-8 w-8': large },
      { 'bg-neutral-50 border-neutral-100 text-neutral-500': !dark },
      { 'bg-white-5 border-white-10 text-white-70': dark },
      { border: !picture }
    )
  )
</script>

<div class="{avatarStyles} rounded flex items-center justify-center font-semibold relative">
  {#if picture}
    <img
      class="h-full w-full rounded object-cover"
      src={picture}
      alt={name}
      onerror={() => {
        picture = ''
      }}
    />
  {:else}
    <span>{name?.charAt(0)}</span>
  {/if}
  {#if country}
    <div class="absolute -bottom-0.5 -right-0.5">
      <BaseFlag {country} />
    </div>
  {/if}
</div>
