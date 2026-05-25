<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { SidebarShow } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { cn, type WithElementRef } from '$lib/utils.js'
  import { useSidebar } from './context.svelte.js'

  let {
    ref = $bindable(null),
    class: className,
    onclick,
    ...restProps
  }: WithElementRef<HTMLButtonAttributes, HTMLButtonElement> = $props()

  const sidebar = useSidebar()
</script>

<button
  bind:this={ref}
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  type="button"
  class={cn(
    'inline-flex size-7 items-center justify-center rounded-md text-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50',
    className
  )}
  onclick={(e) => {
    onclick?.(e)
    sidebar.toggle()
  }}
  {...restProps}
>
  <Icon src={SidebarShow} class="size-4" />
  <span class="sr-only">Toggle Sidebar</span>
</button>
