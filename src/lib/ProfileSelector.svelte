<script lang="ts">
  import clsx from 'clsx'
  import ProfileAvatar from './ProfileAvatar.svelte'

  export let name = ''
  export let collapsed = false

  $: styles = clsx({ 'p-[5px]': collapsed }, { 'w-full pl-1.5 pr-2 py-[7px]': !collapsed })
</script>

<button
  class="{styles} text-white text-sm font-medium flex items-center justify-between space-x-1 rounded"
  on:click
>
  <span class="flex items-center space-x-1">
    <ProfileAvatar {name} dark />
    {#if !collapsed}
      <span class="whitespace-nowrap tracking-normal">{name}</span>
    {/if}
  </span>
</button>
