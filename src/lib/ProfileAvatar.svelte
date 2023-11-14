<script lang="ts">
  import clsx from 'clsx'

  export let name = ''
  export let large = false
  export let dark = false
  export let picture = ''

  $: avatarStyles = clsx(
    { 'h-4 w-4 text-xs rounded-sm': !large },
    { 'h-6 w-6 text-sm rounded': large },
    { 'bg-neutral-50 border-neutral-100 text-neutral-500': !dark },
    { 'bg-white-5 border-white-10 text-white-70': dark }
  )
</script>

<div class="{avatarStyles} flex items-center justify-center font-semibold border">
  {#if picture}
    <img
      class:rounded-sm={!large}
      class:rounded={large}
      class="h-full w-full"
      src={picture}
      alt={name}
    />
  {:else}
    {name?.charAt(0)}
  {/if}
</div>
