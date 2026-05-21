<script lang="ts">
  import MenuItem from './MenuItem.svelte'
  import clsx from 'clsx'
  import { cn } from './utils.js'
  import type { MenuItemProps } from './types.ts'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { ChevronDown, ChevronRight } from '@invopop/ui-icons'
  import { resolveIcon } from './helpers.js'
  import TagBeta from './TagBeta.svelte'

  let {
    label = '',
    url = '',
    isFolderItem = false,
    collapsable = false,
    open = $bindable(false),
    active = false,
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
  let rowStyles = $derived(
    clsx('flex items-center rounded-lg border border-transparent p-1', {
      'gap-1.5': action || collapsable,
      'bg-background-selected-inverse': active,
      'hover:bg-background-selected-inverse': !active
    })
  )
  let buttonStyles = $derived(
    clsx(
      'flex-1 min-w-0 h-6 cursor-pointer text-base flex items-center hover:text-white focus:text-white',
      {
        'text-foreground-inverse font-medium': !isFolderItem,
        'text-foreground-inverse-secondary': isFolderItem && !active,
        'text-white': active
      }
    )
  )
  let wrapperStyles = $derived(
    clsx({
      'group/menu-item ml-4 border-l border-white-10 pl-2 pt-0.5 relative': isFolderItem
    })
  )

  $effect(() => {
    resolveIcon(icon).then((res) => (resolvedIcon = res))
  })

  function handleClick() {
    if (!url && collapsable) {
      open = !open
    }

    onclick?.(url)
  }
</script>

<div bind:this={ref} class={cn(wrapperStyles, className)} data-menu-item-root>
  {#if isFolderItem}
    <div
      class={clsx('border-l border-white h-3 w-px absolute top-3.5 left-0 -m-px', {
        'opacity-0 group-hover/menu-item:opacity-100': !active
      })}
      data-menu-item-tree-indicator
    ></div>
  {/if}
  <div class={rowStyles} data-menu-item-row>
    <button
      onclick={handleClick}
      title={label}
      data-menu-item-button
      class={buttonStyles}
    >
      <span class="flex items-center space-x-1.5 min-w-0 flex-1" data-menu-item-content>
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
            class="h-4 w-4 text-icon-inverse"
            data-menu-item-icon
          />
        {/if}
        <span class="truncate tracking-normal" data-menu-item-label>{label}</span>
        {#if beta}
          <TagBeta />
        {/if}
      </span>
    </button>
    {#if action}
      <span class="shrink-0" data-menu-item-action>
        {@render action()}
      </span>
    {/if}
    {#if collapsable}
      <button
        class="shrink-0 cursor-pointer"
        data-menu-item-chevron
        onclick={() => (open = !open)}
      >
        <Icon src={open ? ChevronDown : ChevronRight} class="h-4 w-4 text-white-40" />
      </button>
    {/if}
  </div>
  {#if children?.length && (open || !collapsable)}
    <ul data-menu-item-children>
      {#each children as child}
        <li>
          <MenuItem {...child} isFolderItem {onclick} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
