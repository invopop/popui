<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import clsx from 'clsx'
  import type { MenuItemCollapsibleProps } from './types'

  let {
    collapsed = false,
    title = '',
    subtitle = '',
    active = false,
    bold = false,
    icon = undefined,
    children
  }: MenuItemCollapsibleProps = $props()

  let styles = $derived(
    clsx(
      { 'p-1': collapsed },
      { 'space-x-2 w-full p-[7px]': !collapsed },
      { 'bg-selected-inverse': active },
      { 'hover:bg-background-selected-inverse': !active },
      { 'font-medium': bold }
    )
  )
</script>

<span
  {title}
  class="{styles} text-foreground-inverse text-base flex items-center justify-between rounded-lg h-8 font-medium"
>
  <span class:space-x-2={!collapsed} class="flex items-center">
    {@render children?.()}
    {#if !collapsed}
      <div>
        <div class="whitespace-nowrap max-w-[118px] truncate tracking-tight">{title}</div>
        {#if subtitle}
          <div class="text-sm text-foreground-inverse-secondary">{subtitle}</div>
        {/if}
      </div>
    {/if}
  </span>
  {#if icon}
    <Icon src={icon} class="h-4 w-4 text-icon-inverse" />
  {/if}
</span>
