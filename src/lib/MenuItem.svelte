<script lang="ts">
  import { flip, shift, offset } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import clsx from 'clsx'
  import type { IconTheme, MenuItemProps } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { ChevronDown, ChevronRight } from '@steeze-ui/heroicons'
  import { SubFolder } from '@invopop/ui-icons'
  import { createEventDispatcher, onMount } from 'svelte'
  import { resolveIcon } from './helpers.js'
  import DrawerContext from './DrawerContext.svelte'

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'bottom-start',
    middleware: [offset(-4), flip(), shift()]
  })

  export let label = ''
  export let url = ''
  export let isFolderItem = false
  export let collapsable = false
  export let open = false
  export let active = false
  export let collapsedSidebar = false
  export let iconTheme: IconTheme = 'default'
  export let icon: IconSource | string | undefined = undefined
  export let children: MenuItemProps[] | undefined = undefined

  let resolvedIcon: IconSource | undefined
  let hovered = false
  let leaveHoverTimeout: ReturnType<typeof setTimeout> | null = null

  const dispatch = createEventDispatcher()

  $: itemStyles = clsx(
    { 'text-white font-medium': !isFolderItem },
    { 'text-white-40': isFolderItem },
    { 'bg-white-10': active },
    { 'border border-transparent hover:border-white-5 group': collapsedSidebar },
    { 'w-full': !collapsedSidebar }
  )

  $: iconStyles = clsx({ 'group-hover:text-white': collapsedSidebar })

  $: wrapperStyles = clsx({
    'ml-4 border-l border-white-10 pl-2 pt-1': isFolderItem
  })

  $: items = [
    { label, value: url, selected: active, icon },
    ...(children || []).map((c) => ({
      label: c.label || '',
      value: c.url || '',
      selected: c.active,
      icon: SubFolder
    }))
  ]

  function handleClick() {
    dispatch('click', url)
  }

  function handleClickChild(event: CustomEvent) {
    dispatch('click', event.detail)
  }

  function handleHover() {
    if (leaveHoverTimeout) {
      clearTimeout(leaveHoverTimeout)
    }
    hovered = true
  }

  function handleBlur() {
    leaveHoverTimeout = setTimeout(() => {
      hovered = false
    }, 200)
  }

  onMount(async () => {
    resolvedIcon = await resolveIcon(icon)
  })
</script>

<div class={wrapperStyles}>
  <button
    use:floatingRef
    on:mouseenter={handleHover}
    on:mouseleave={handleBlur}
    on:click={handleClick}
    title={label}
    class="{itemStyles} text-sm flex items-center justify-between hover:text-white focus:text-white hover:bg-white-5 focus:bg-white-10 px-2 py-1.5 rounded"
  >
    <span class="flex items-center space-x-1">
      {#if resolvedIcon}
        <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} h-5 w-5 text-white-70" />
      {/if}
      {#if !collapsedSidebar}
        <span>{label}</span>
      {/if}
    </span>
    {#if collapsable && !collapsedSidebar}
      <button
        on:click|stopPropagation={() => {
          open = !open
        }}
      >
        <Icon src={open ? ChevronDown : ChevronRight} class="h-4 w-4 text-white-40" />
      </button>
    {/if}
  </button>
  {#if children?.length}
    {#if collapsedSidebar}
      {#if hovered}
        <div
          use:floatingContent
          role="contentinfo"
          on:mouseenter={handleHover}
          on:mouseleave={handleBlur}
          class="pt-4 z-30"
        >
          <DrawerContext on:click={handleClickChild} {items} />
        </div>
      {/if}
    {:else if open || !collapsable}
      <ul>
        {#each children as child}
          <li>
            <svelte:self {...child} isFolderItem on:click />
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
