<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import ShortcutWrapper from '$lib/ShortcutWrapper.svelte'
  import { cn, type WithElementRef } from '$lib/utils.js'
  import { SIDEBAR_DRAG_THRESHOLD_PX } from './constants.js'
  import { useSidebar } from './context.svelte.js'

  function portal(node: HTMLElement) {
    const target = typeof document !== 'undefined' ? document.body : null
    if (target) target.appendChild(node)
    return {
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node)
      }
    }
  }

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> = $props()

  const sidebar = useSidebar()

  let dragStartX = 0
  let dragStartWidthPx = 0
  let dragMoved = false
  let dragDirection: 1 | -1 = 1

  let isHovering = $state(false)
  let isDragging = $state(false)
  let tooltipVisible = $derived(isHovering && !isDragging)
  let tooltipX = $state(0)
  let tooltipY = $state(0)
  let tooltipWidth = $state(0)
  let tooltipHeight = $state(0)

  const TOOLTIP_CURSOR_OFFSET = 12
  const TOOLTIP_VIEWPORT_PADDING = 8

  let tooltipLeft = $derived.by(() => {
    if (tooltipWidth === 0 || typeof window === 'undefined') return tooltipX
    const desired = tooltipX - tooltipWidth / 2
    const minX = TOOLTIP_VIEWPORT_PADDING
    const maxX = window.innerWidth - tooltipWidth - TOOLTIP_VIEWPORT_PADDING
    return Math.max(minX, Math.min(maxX, desired))
  })

  let tooltipTop = $derived.by(() => {
    const desired = tooltipY + TOOLTIP_CURSOR_OFFSET
    if (tooltipHeight === 0 || typeof window === 'undefined') return desired
    const maxY = window.innerHeight - tooltipHeight - TOOLTIP_VIEWPORT_PADDING
    return Math.min(maxY, desired)
  })

  function updateTooltipPosition(e: PointerEvent) {
    tooltipX = e.clientX
    tooltipY = e.clientY
  }

  function onPointerEnter(e: PointerEvent) {
    const sidebarRoot = (e.currentTarget as HTMLElement).closest('[data-slot="sidebar"]')
    dragDirection = sidebarRoot?.getAttribute('data-side') === 'right' ? -1 : 1
    updateTooltipPosition(e)
    isHovering = true
  }

  function onPointerLeave() {
    isHovering = false
  }

  function onPointerDown(e: PointerEvent) {
    if (sidebar.state !== 'expanded' || sidebar.isMobile) return
    const button = e.currentTarget as HTMLButtonElement
    const sidebarRoot = button.closest('[data-slot="sidebar"]')
    dragDirection = sidebarRoot?.getAttribute('data-side') === 'right' ? -1 : 1

    const container = sidebarRoot?.querySelector('[data-slot="sidebar-container"]')
    dragStartWidthPx = container instanceof HTMLElement ? container.offsetWidth : 256
    dragStartX = e.clientX
    dragMoved = false
    button.setPointerCapture(e.pointerId)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  function onPointerMove(e: PointerEvent) {
    if (tooltipVisible) updateTooltipPosition(e)
    const button = e.currentTarget as HTMLButtonElement
    if (!button.hasPointerCapture(e.pointerId)) return
    const delta = (e.clientX - dragStartX) * dragDirection
    if (Math.abs(delta) > SIDEBAR_DRAG_THRESHOLD_PX) {
      dragMoved = true
      isDragging = true
    }
    if (dragMoved) sidebar.setWidth(dragStartWidthPx + delta)
  }

  function onPointerUp(e: PointerEvent) {
    const button = e.currentTarget as HTMLButtonElement
    if (button.hasPointerCapture(e.pointerId)) button.releasePointerCapture(e.pointerId)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    isDragging = false
  }

  function onClick(e: MouseEvent) {
    if (dragMoved) {
      e.preventDefault()
      e.stopPropagation()
      dragMoved = false
      return
    }
    sidebar.toggle()
  }
</script>

<button
  bind:this={ref}
  data-sidebar="rail"
  data-slot="sidebar-rail"
  aria-label="Toggle Sidebar"
  tabindex={-1}
  type="button"
  onpointerenter={onPointerEnter}
  onpointerleave={onPointerLeave}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onpointercancel={onPointerUp}
  onclick={onClick}
  class={cn(
    'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
    'after:absolute after:inset-y-0 after:left-1/2 after:w-[2px]',
    'hover:after:bg-sidebar-border',
    'group-data-[side=left]:cursor-w-resize group-data-[side=right]:cursor-e-resize',
    '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
    'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
    '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
    '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</button>

{#if tooltipVisible}
  <div
    use:portal
    role="tooltip"
    bind:offsetWidth={tooltipWidth}
    bind:offsetHeight={tooltipHeight}
    class="fixed z-[1002] pointer-events-none rounded-md border border-border-inverse bg-background-default-negative px-3 py-2 text-sm font-medium text-foreground-inverse leading-5 tracking-tight shadow-md"
    style="left: {tooltipLeft}px; top: {tooltipTop}px; visibility: {tooltipWidth > 0
      ? 'visible'
      : 'hidden'};"
  >
    <div class="flex flex-col gap-1.5">
      {#if sidebar.state === 'expanded'}
        <div>Drag to resize</div>
      {/if}
      <div class="flex items-center justify-between gap-3">
        <span>
          {sidebar.state === 'expanded' ? 'Click to collapse' : 'Click to expand'}
        </span>
        <div class="flex items-center gap-1">
          <ShortcutWrapper size="md" theme="navigation">⌘</ShortcutWrapper>
          <ShortcutWrapper size="md" theme="navigation">.</ShortcutWrapper>
        </div>
      </div>
    </div>
  </div>
{/if}
