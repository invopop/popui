<script lang="ts">
  import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements'
  import { Tooltip as TooltipPrimitive } from 'bits-ui'
  import ShortcutWrapper from '$lib/ShortcutWrapper.svelte'
  import TooltipContent from '$lib/tooltip/tooltip-content.svelte'
  import { cn, type WithElementRef } from '$lib/utils.js'
  import { SIDEBAR_DRAG_THRESHOLD_PX, SIDEBAR_MIN_WIDTH_PX } from './constants.js'
  import { useSidebar } from './context.svelte.js'

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

  let isDragging = $state(false)
  let tooltipOpen = $state(false)
  let cursorX = $state(0)
  let cursorY = $state(0)

  const TOOLTIP_HOVER_DELAY_MS = 700
  const TOOLTIP_CURSOR_OFFSET = 12

  let cursorAnchor = $derived.by(() => {
    const x = cursorX
    const y = cursorY
    return {
      getBoundingClientRect: () => DOMRect.fromRect({ x, y, width: 0, height: 0 })
    }
  })

  function onPointerEnter(e: PointerEvent) {
    const sidebarRoot = (e.currentTarget as HTMLElement).closest('[data-slot="sidebar"]')
    dragDirection = sidebarRoot?.getAttribute('data-side') === 'right' ? -1 : 1
    cursorX = e.clientX
    cursorY = e.clientY
  }

  const COLLAPSE_DRAG_OVERSHOOT_PX = 100
  const POST_DRAG_CLICK_GUARD_MS = 250
  let dragEndTime = 0

  function onPointerMove(e: PointerEvent) {
    cursorX = e.clientX
    cursorY = e.clientY
    const button = e.currentTarget as HTMLButtonElement
    if (!button.hasPointerCapture(e.pointerId)) return
    const delta = (e.clientX - dragStartX) * dragDirection
    if (Math.abs(delta) > SIDEBAR_DRAG_THRESHOLD_PX) {
      dragMoved = true
      isDragging = true
      sidebar.isResizing = true
      tooltipOpen = false
    }
    if (!dragMoved) return
    if (sidebar.state === 'collapsed') {
      if (delta > 0) {
        button.releasePointerCapture(e.pointerId)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        isDragging = false
        sidebar.isResizing = false
        dragMoved = false
        dragEndTime = Date.now()
        sidebar.setOpen(true)
      }
      return
    }
    const targetWidth = dragStartWidthPx + delta
    if (targetWidth < SIDEBAR_MIN_WIDTH_PX - COLLAPSE_DRAG_OVERSHOOT_PX) {
      button.releasePointerCapture(e.pointerId)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      isDragging = false
      sidebar.isResizing = false
      dragMoved = false
      dragEndTime = Date.now()
      sidebar.resetWidth()
      sidebar.setOpen(false)
      return
    }
    sidebar.setWidth(targetWidth)
  }

  function onPointerDown(e: PointerEvent) {
    if (sidebar.isMobile) return
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

  function onPointerUp(e: PointerEvent) {
    const button = e.currentTarget as HTMLButtonElement
    if (button.hasPointerCapture(e.pointerId)) button.releasePointerCapture(e.pointerId)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    isDragging = false
    sidebar.isResizing = false
    if (dragMoved) {
      dragEndTime = Date.now()
      dragMoved = false
    }
  }

  const DOUBLE_CLICK_DELAY_MS = 300
  let pendingClickTimer: ReturnType<typeof setTimeout> | undefined

  function onClick(e: MouseEvent) {
    if (Date.now() - dragEndTime < POST_DRAG_CLICK_GUARD_MS) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    clearTimeout(pendingClickTimer)
    pendingClickTimer = setTimeout(() => {
      pendingClickTimer = undefined
      sidebar.toggle()
    }, DOUBLE_CLICK_DELAY_MS)
  }

  function onDoubleClick() {
    if (sidebar.isMobile) return
    clearTimeout(pendingClickTimer)
    pendingClickTimer = undefined
    sidebar.setOpen(true)
    sidebar.resetWidth()
  }
</script>

<TooltipPrimitive.Root
  bind:open={tooltipOpen}
  delayDuration={TOOLTIP_HOVER_DELAY_MS}
  disableHoverableContent
>
  <TooltipPrimitive.Trigger disabled={isDragging}>
    {#snippet child({ props })}
      {@const buttonProps = props as HTMLButtonAttributes}
      <button
        bind:this={ref}
        {...buttonProps}
        onpointerenter={(e) => {
          buttonProps.onpointerenter?.(e)
          onPointerEnter(e)
        }}
        onpointermove={(e) => {
          buttonProps.onpointermove?.(e)
          onPointerMove(e)
        }}
        onpointerdown={(e) => {
          buttonProps.onpointerdown?.(e)
          onPointerDown(e)
        }}
        onpointerup={(e) => {
          buttonProps.onpointerup?.(e)
          onPointerUp(e)
        }}
        onpointercancel={onPointerUp}
        onclick={(e) => {
          buttonProps.onclick?.(e)
          onClick(e)
        }}
        ondblclick={onDoubleClick}
        data-sidebar="rail"
        data-slot="sidebar-rail"
        aria-label="Toggle Sidebar"
        tabindex={-1}
        type="button"
        class={cn(
          'absolute inset-y-0 z-50 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
          'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:transition-colors after:duration-150',
          'hover:after:delay-150 hover:after:bg-background-accent-default',
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
    {/snippet}
  </TooltipPrimitive.Trigger>
  <TooltipContent
    customAnchor={cursorAnchor}
    side="bottom"
    align="center"
    sideOffset={TOOLTIP_CURSOR_OFFSET}
    class="px-3 py-2"
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
  </TooltipContent>
</TooltipPrimitive.Root>
