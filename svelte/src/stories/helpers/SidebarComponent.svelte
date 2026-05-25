<script lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger
  } from '$lib/sidebar/index.js'
  import SidebarFooterDemo from './SidebarFooterDemo.svelte'
  import SidebarHeaderDemo from './SidebarHeaderDemo.svelte'
  import SidebarItemsDemo from './SidebarItemsDemo.svelte'

  interface Props {
    side?: 'left' | 'right'
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
    defaultOpen?: boolean
  }

  let {
    side = 'left',
    variant = 'sidebar',
    collapsible = 'icon',
    defaultOpen = true
  }: Props = $props()

  let open = $state(defaultOpen)
  $effect(() => {
    open = defaultOpen
  })
</script>

<SidebarProvider bind:open style="height: 100vh;">
  <Sidebar {side} {variant} {collapsible}>
    <SidebarHeader>
      <SidebarHeaderDemo />
    </SidebarHeader>

    <SidebarContent>
      <SidebarItemsDemo />
    </SidebarContent>

    <SidebarFooter>
      <SidebarFooterDemo />
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>

  <SidebarInset>
    <header class="flex items-center gap-3 border-b border-border p-3">
      <SidebarTrigger />
      <span class="text-sm text-foreground-default-secondary">
        Sidebar state: <strong class="text-foreground">{open ? 'expanded' : 'collapsed'}</strong>
        — drag the rail or press <kbd class="rounded border px-1">⌘B</kbd> /
        <kbd class="rounded border px-1">Ctrl+B</kbd>
      </span>
    </header>
    <main class="flex-1 p-6">
      <h1 class="text-lg font-semibold text-foreground">Main content</h1>
      <p class="mt-2 text-sm text-foreground-default-secondary">
        Resize the viewport below 768px to see the mobile Sheet drawer behavior.
      </p>
    </main>
  </SidebarInset>
</SidebarProvider>
