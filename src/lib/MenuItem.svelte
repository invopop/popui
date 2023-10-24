<script lang="ts">
  import clsx from 'clsx'
  import type { IconTheme } from '$lib/types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'

  export let label = ''
  export let isFolderItem = false
  export let iconTheme: IconTheme = 'default'
  export let icon: IconSource | undefined = undefined

  $: itemStyles = clsx(
    { 'text-white font-semibold': !isFolderItem },
    { 'text-white-40': isFolderItem }
  )

  $: wrapperStyles = clsx({ 'ml-4 border-l border-white-10 pl-2': isFolderItem })
</script>

<div class={wrapperStyles}>
  <button
    class="{itemStyles} text-sm flex items-center space-x-1 hover:text-white focus:text-white hover:bg-white-5 focus:bg-white-10 px-2 py-1.5 rounded-lg w-full"
  >
    {#if icon}
      <Icon src={icon} theme={iconTheme} class="h-5 w-5 text-white-70" />
    {/if}
    <span>{label}</span>
  </button>
</div>
