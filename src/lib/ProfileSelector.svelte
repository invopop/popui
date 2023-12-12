<script lang="ts">
  import clsx from 'clsx'
  import ProfileAvatar from './ProfileAvatar.svelte'

  export let name = ''
  export let collapsed = false

  $: styles = clsx({ 'p-[7px]': collapsed }, { 'w-full pl-1.5 pr-2 py-[7px]': !collapsed })
</script>

<button
  class="{styles} text-white text-sm font-medium flex items-center justify-between space-x-1 border border-transparent focus:border-white-10 focus:bg-white-5 hover:bg-white-5 rounded"
>
  <span class="flex items-center space-x-1">
    <ProfileAvatar {name} dark />
    {#if !collapsed}
      <span>{name}</span>
    {/if}
  </span>
</button>
