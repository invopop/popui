<script lang="ts">
  import clsx from 'clsx'
  import BaseFlag from './BaseFlag.svelte'

  export let name = ''
  export let large = false
  export let dark = false
  export let picture = ''
  export let country = ''

  $: avatarStyles = clsx(
    { 'h-5 w-5 text-xs rounded-sm': !large },
    { 'h-8 w-8 rounded': large },
    { 'bg-neutral-50 border-neutral-100 text-neutral-500': !dark },
    { 'bg-white-5 border-white-10 text-white-70': dark }
  )
</script>

<div class="{avatarStyles} flex items-center justify-center font-semibold border relative">
  {#if picture}
    <img
      class:rounded-sm={!large}
      class:rounded={large}
      class="h-full w-full"
      src={picture}
      alt={name}
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
