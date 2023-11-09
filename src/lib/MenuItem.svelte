<script lang="ts">
  import clsx from 'clsx'
  import type { IconTheme, MenuItemProps } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons'
  import { createEventDispatcher, onMount } from 'svelte'
  import { resolveIcon } from './helpers.js'

  export let label = ''
  export let url = ''
  export let isFolderItem = false
  export let collapsable = false
  export let open = false
  export let active = false
  export let iconTheme: IconTheme = 'default'
  export let icon: IconSource | string | undefined = undefined
  export let children: MenuItemProps[] | undefined = undefined

  let resolvedIcon: IconSource | undefined

  const dispatch = createEventDispatcher()

  $: itemStyles = clsx(
    { 'text-white font-semibold': !isFolderItem },
    { 'text-white-40': isFolderItem },
    { 'bg-white-10': active }
  )

  $: wrapperStyles = clsx({ 'ml-4 border-l border-white-10 pl-2': isFolderItem })

  function handleClick() {
    dispatch('click', url)
  }

  onMount(async () => {
    resolvedIcon = await resolveIcon(icon)
  })
</script>

<div class={wrapperStyles}>
  <button
    on:click={handleClick}
    class="{itemStyles} text-sm flex items-center justify-between hover:text-white focus:text-white hover:bg-white-5 focus:bg-white-10 px-2 py-1.5 rounded-lg w-full"
  >
    <span class="flex items-center space-x-1">
      {#if resolvedIcon}
        <Icon src={resolvedIcon} theme={iconTheme} class="h-5 w-5 text-white-70" />
      {/if}
      <span>{label}</span></span
    >
    {#if collapsable}
      <button
        on:click|stopPropagation={() => {
          open = !open
        }}
      >
        <Icon src={open ? ChevronDown : ChevronRight} class="h-4 w-4 text-white-40" />
      </button>
    {/if}
  </button>
  {#if children?.length && (open || !collapsable)}
    {#each children as child}
      <svelte:self {...child} isFolderItem on:click />
    {/each}
  {/if}
</div>
