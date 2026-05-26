<script lang="ts">
  import MenuItem from './MenuItem.svelte'
  import { flip, shift, offset } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import clsx from 'clsx'
  import { cn } from './utils.js'
  import type { MenuItemProps, DrawerOption, AnyProp } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { ChevronDown, ChevronRight, FolderL } from '@invopop/ui-icons'
  import { resolveIcon } from './helpers.js'
  import DrawerContext from './DrawerContext.svelte'
  import TagBeta from './TagBeta.svelte'

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
    imageUrl = undefined,
    beta = false,
    children = undefined,
    action,
    ref = $bindable(null),
    class: className,
    onclick
  }: MenuItemProps = $props()

  let resolvedIcon: IconSource | undefined = $state()
  let hovered = $state(false)
  let highlight = $state(false)
  let leaveHoverTimeout: ReturnType<typeof setTimeout> | null = null
  let rowStyles = $derived(
    clsx('flex items-center rounded-lg', {
      'py-1 pr-1': !collapsedSidebar,
      'pl-2': !collapsedSidebar && !imageUrl,
      'pl-[10px]': !collapsedSidebar && imageUrl,
      'gap-1.5': !collapsedSidebar && (action || collapsable),
      'size-8 p-[7px] justify-center mx-auto': collapsedSidebar,
      'bg-background-selected-inverse': active,
      'hover:bg-background-selected-inverse': !active
    })
  )
  let buttonStyles = $derived(
    clsx('cursor-pointer text-base flex items-center hover:text-white focus:text-white', {
      'flex-1 min-w-0 h-6': !collapsedSidebar,
      'group': collapsedSidebar,
      'text-foreground-inverse font-medium': !isFolderItem,
      'text-foreground-inverse-secondary': isFolderItem && !active,
      'text-white': active
    })
  )
  let iconStyles = $derived(
    clsx({ 'group-hover:text-white text-icon-inverse-bold!': collapsedSidebar })
  )
  let wrapperStyles = $derived(
    clsx({
      'group/menu-item ml-4 border-l border-white-10 pl-2 pt-0.5 relative': isFolderItem
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

<div bind:this={ref} class={cn(wrapperStyles, className)} data-menu-item-root>
  {#if isFolderItem}
    <div
      class={clsx('border-l border-white h-3 w-px absolute top-3.5 left-0 -m-px', {
        'opacity-0 group-hover/menu-item:opacity-100': !active && !collapsedSidebar,
        'opacity-0': collapsedSidebar && !highlight && !active
      })}
      data-menu-item-tree-indicator
    ></div>
  {/if}
  <div
    class={rowStyles}
    data-menu-item-row
    use:floatingRef
    onmouseenter={collapsedSidebar ? handleHover : undefined}
    onmouseleave={collapsedSidebar ? handleBlur : undefined}
    role={collapsedSidebar ? 'presentation' : undefined}
  >
    <button
      onclick={handleClick}
      title={label}
      data-menu-item-button
      class={buttonStyles}
    >
      <span
        class={clsx('flex items-center', {
          'space-x-1.5 min-w-0 flex-1': !collapsedSidebar
        })}
        data-menu-item-content
      >
        {#if imageUrl}
          <img
            src={imageUrl}
            alt={label}
            class="size-4 shrink-0 rounded bg-white object-contain"
            data-menu-item-image
          />
        {:else if resolvedIcon}
          <Icon
            src={resolvedIcon}
            theme={iconTheme}
            class="{iconStyles} h-4 w-4 text-icon-inverse"
            data-menu-item-icon
          />
        {/if}
        {#if !collapsedSidebar}
          <span class="truncate tracking-normal" data-menu-item-label>{label}</span>
          {#if beta}
            <TagBeta />
          {/if}
        {/if}
      </span>
    </button>
    {#if !collapsedSidebar && action}
      <span class="shrink-0 flex items-center" data-menu-item-action>
        {@render action()}
      </span>
    {/if}
    {#if !collapsedSidebar && collapsable}
      <button
        class="shrink-0 cursor-pointer"
        data-menu-item-chevron
        onclick={() => (open = !open)}
      >
        <Icon src={open ? ChevronDown : ChevronRight} class="h-4 w-4 text-white-40" />
      </button>
    {/if}
  </div>
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
          <DrawerContext autofocus onclick={handleClickChild} {items} />
        </div>
      {/if}
    {:else if open || !collapsable}
      <ul data-menu-item-children>
        {#each children as child}
          <li>
            <MenuItem {...child} isFolderItem {onclick} />
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
