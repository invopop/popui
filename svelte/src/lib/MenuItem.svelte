<script lang="ts">
  import MenuItem from './MenuItem.svelte'
  import { flip, shift, offset } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import clsx from 'clsx'
  import type { MenuItemProps, DrawerOption, AnyProp } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { ChevronDown, ChevronRight } from '@invopop/ui-icons'
  import { FolderL } from '@invopop/ui-icons'
  import { resolveIcon } from './helpers.js'
  import DrawerContext from './DrawerContext.svelte'

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'bottom-start',
    middleware: [offset(-4), flip(), shift()]
  })

  let {
    label = '',
    url = '',
    isFolderItem = false,
    collapsable = false,
    open = $bindable(false),
    active = false,
    collapsedSidebar = false,
    iconTheme = 'default',
    icon = undefined,
    children = undefined,
    onclick
  }: MenuItemProps = $props()

  let resolvedIcon: IconSource | undefined = $state()
  let hovered = $state(false)
  let highlight = $state(false)
  let leaveHoverTimeout: ReturnType<typeof setTimeout> | null = null
  let itemStyles = $derived(
    clsx(
      { 'text-white font-medium': !isFolderItem },
      { 'text-white-40': isFolderItem && !active },
      { 'bg-white-10': active },
      { 'border border-transparent hover:border-white-5 group p-2': collapsedSidebar },
      { 'w-full px-2 py-1.5': !collapsedSidebar },
      {
        'bg-white-10 border-white-5 text-white': active
      },
      { 'hover:bg-white-5 focus:bg-white-10': !active }
    )
  )
  let iconStyles = $derived(clsx({ 'group-hover:text-white': collapsedSidebar }))
  let wrapperStyles = $derived(
    clsx({
      'ml-4 border-l border-white-10 pl-2 pt-0.5 relative': isFolderItem
    })
  )
  let items = $derived([
    { label, value: url, selected: active, icon: resolvedIcon },
    ...(children || []).map((c) => ({
      label: c.label || '',
      value: c.url || '',
      selected: c.active,
      icon: FolderL
    }))
  ] as DrawerOption[])

  $effect(() => {
    resolveIcon(icon).then((res) => (resolvedIcon = res))
  })

  function handleClick() {
    if (!url && collapsable) {
      open = !open
    }

    onclick?.(url)
  }

  function handleClickChild(value: AnyProp) {
    hovered = false
    onclick?.(value as string)
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
    <div class="border-l border-white h-3 w-px absolute top-[14px] left-0 -m-px"></div>
  {/if}
  <button
    use:floatingRef
    onmouseenter={handleHover}
    onmouseleave={handleBlur}
    onclick={handleClick}
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
        onclick={(e) => {
          e.stopPropagation()
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
          onmouseenter={handleHover}
          onmouseleave={handleBlur}
          class="pt-4 z-30"
        >
          <DrawerContext onclick={handleClickChild} {items} />
        </div>
      {/if}
    {:else if open || !collapsable}
      <ul>
        {#each children as child}
          <li>
            <MenuItem {...child} isFolderItem {onclick} />
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
