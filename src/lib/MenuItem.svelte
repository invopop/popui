<script lang="ts">
  import { flip, shift, offset } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import clsx from 'clsx'
  import type { IconTheme, MenuItemProps, DrawerOption } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { ChevronDown, ChevronRight } from '@invopop/ui-icons'
  import { SubFolder } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'
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
  let highlight = false
  let leaveHoverTimeout: ReturnType<typeof setTimeout> | null = null

  const dispatch = createEventDispatcher()

  $: {
    resolveIcon(icon).then((icon) => {
      resolvedIcon = icon
    })
  }

  $: itemStyles = clsx(
    { 'text-white font-medium': !isFolderItem },
    { 'text-white-40': isFolderItem },
    { 'bg-white-10': active },
    { 'border border-transparent hover:border-white-5 group p-2': collapsedSidebar },
    { 'w-full px-2 py-1.5': !collapsedSidebar },
    { 'hover:bg-white-10 hover:border-white-5 focus:bg-white-10 focus:border-white-5': active },
    { 'hover:bg-white-5 focus:bg-white-10': !active }
  )

  $: iconStyles = clsx({ 'group-hover:text-white': collapsedSidebar })

  $: wrapperStyles = clsx({
    'ml-4 border-l border-white-10 pl-2 pt-0.5': isFolderItem
  })

  $: items = [
    { label, value: url, selected: active, icon: resolvedIcon },
    ...(children || []).map((c) => ({
      label: c.label || '',
      value: c.url || '',
      selected: c.active,
      icon: SubFolder
    }))
  ] as DrawerOption[]

  function handleClick() {
    if (!url && collapsable) {
      open = !open
    }

    dispatch('click', url)
  }

  function handleClickChild(event: CustomEvent) {
    hovered = false
    dispatch('click', event.detail)
  }

  function handleHover() {
    highlight = true
    if (leaveHoverTimeout) {
      clearTimeout(leaveHoverTimeout)
    }
    hovered = true
  }

  function handleBlur() {
    highlight = false
    leaveHoverTimeout = setTimeout(() => {
      hovered = false
    }, 200)
  }
</script>

<div class={wrapperStyles}>
  {#if isFolderItem && (highlight || active)}
    <div class="border-l border-white h-3 w-px absolute top-[14px] left-0 -m-px" />
  {/if}
  <button
    use:floatingRef
    on:mouseenter={handleHover}
    on:mouseleave={handleBlur}
    on:click={handleClick}
    title={label}
    class="{itemStyles} text-base border border-transparent flex items-center justify-between hover:text-white focus:text-white rounded-md"
  >
    <span class="flex items-center space-x-2">
      {#if resolvedIcon}
        <Icon src={resolvedIcon} theme={iconTheme} class="{iconStyles} h-4 w-4 text-white-70" />
      {/if}
      {#if !collapsedSidebar}
        <span class="whitespace-nowrap tracking-normal">{label}</span>
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
