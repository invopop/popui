<script lang="ts">
  import IconEmpty from './svg/IconEmpty.svelte'
  import CheckBadge from './svg/CheckBadge.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { EmptyStateProps } from './types'

  let {
    icon,
    iconSource,
    title = '',
    description = '',
    check = false,
    children
  }: EmptyStateProps = $props()
</script>

<div class="flex flex-col items-center justify-center">
  {#if icon}
    <div class="relative h-[120px] w-[352px] max-w-sm flex items-center justify-center">
      {@render icon()}
    </div>
  {:else if iconSource}
    <div class="relative h-[120px] w-[352px] max-w-sm">
      <IconEmpty />
      <div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Icon src={iconSource} class="size-10 text-icon-accent" />
        {#if check}
          <CheckBadge />
        {/if}
      </div>
    </div>
  {/if}
  <div class="flex flex-col items-center gap-0.5 text-center">
    {#if title}
      <h4 class="font-medium text-foreground text-base">{title}</h4>
    {/if}
    {#if description}
      <p class="text-foreground-default-secondary text-base">{description}</p>
    {/if}
  </div>
  {#if children}
    <div class="mt-4">
      {@render children()}
    </div>
  {/if}
</div>
