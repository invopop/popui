<script lang="ts">
  import clsx from 'clsx'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { DoubleArrow } from '@invopop/ui-icons'

  export let name = ''
  export let orgName = ''
  export let picture = ''
  export let collapsed = false

  $: styles = clsx({ 'p-[5px]': collapsed }, { 'w-full pl-1.5 pr-2 py-[7px]': !collapsed })
</script>

<button
  class="{styles} text-white text-base flex items-center justify-between space-x-1 focus:border-white-10 active:border-white-10 hover:bg-white-5 rounded text-left"
  on:click
>
  <span class="flex items-center justify-between w-full space-x-2">
    <ProfileAvatar {name} {picture} dark large />
    {#if !collapsed}
      <div class="flex-1 flex flex-col">
        <span class="tracking-normal font-medium truncate max-w-[136px]">{name}</span>
        <span class="text-sm text-white-50 truncate max-w-[136px]">{orgName}</span>
      </div>
      <Icon src={DoubleArrow} class="w-4 h-4 text-white-40" />
    {/if}
  </span>
</button>
