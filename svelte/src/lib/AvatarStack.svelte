<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import clsx from 'clsx'
  import { TooltipProvider } from '$lib/tooltip'
  import AvatarIcon from '$lib/AvatarIcon.svelte'
  import type { AvatarStackProps } from '$lib/types.js'
  import { cn } from './utils.js'

  let { icons = [], size = 'md', class: className }: AvatarStackProps = $props()

  let maxItems = $derived(icons.length > 5 ? 4 : 5)
  let mainIcons = $derived(icons.slice(0, maxItems))
  let restIcons = $derived(icons.slice(maxItems, icons.length))
</script>

{#snippet restTooltip()}
  {#each restIcons as restIcon}
    <div>{restIcon.name}</div>
  {/each}
{/snippet}

<TooltipProvider>
  <div class={cn('flex flex-col space-y-2 sm:flex-row sm:flex-nowrap sm:space-y-0 items-center', className)}>
    {#each mainIcons as icon, i (i)}
      <AvatarIcon
        name={icon.name}
        {size}
        showMask={i < mainIcons.length - 1 || restIcons.length > 0}
      >
        <div
          data-avatar-stack-item
          class={clsx(
            'flex items-center bg-background-default-secondary text-icon shrink-0',
            size === 'sm' ? 'p-1 rounded' : 'p-1.5 rounded-md'
          )}
        >
          {#if icon.icon}
            <Icon src={icon.icon} class="size-4 shrink-0" />
          {:else if icon.url}
            <img src={icon.url} alt={icon.name} class="size-4 shrink-0" />
          {/if}
        </div>
      </AvatarIcon>
    {/each}
    {#if restIcons.length}
      <AvatarIcon {size} tooltipContent={restTooltip}>
        <div
          data-avatar-stack-overflow
          class={clsx(
            'flex items-center justify-center text-icon font-medium text-sm shrink-0 bg-background-default-secondary',
            size === 'sm' ? 'size-6 rounded' : 'size-7 rounded-md'
          )}
        >
          +{restIcons.length}
        </div>
      </AvatarIcon>
    {/if}
  </div>
</TooltipProvider>
