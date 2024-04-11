<script lang="ts">
  import clsx from 'clsx'
  import ProfileAvatar from './ProfileAvatar.svelte'

  export let name = ''
  export let picture = ''
  export let collapsed = false

  $: styles = clsx({ 'p-[5px]': collapsed }, { 'w-full pl-1.5 pr-2 py-[7px]': !collapsed })
</script>

<button
  class="{styles} text-white text-base font-medium flex items-center justify-between space-x-1 focus:border-white-10 active:border-white-10 hover:bg-white-5 rounded"
  on:click
>
  <span class="flex items-center space-x-2">
    <ProfileAvatar {name} {picture} dark />
    {#if !collapsed}
      <span class="whitespace-nowrap tracking-normal">{name}</span>
    {/if}
  </span>
</button>
