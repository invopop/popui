<script lang="ts">
  import { offset, flip, shift, size } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { clickOutside } from './clickOutside.js'
  import { portal } from 'svelte-portal'
  import type { BaseDropdownProps } from './types.js'
  import type { TransitionConfig } from 'svelte/transition'

  let {
    isOpen = $bindable(false),
    fullWidth = false,
    placement = 'bottom-start',
    matchParentWidth = false,
    usePortal = true,
    class: className = '',
    trigger,
    children,
    ...rest
  }: BaseDropdownProps = $props()

  // Conditional portal action - noop if disabled
  const conditionalPortal = usePortal ? portal : () => {}

  const middleware = [offset(6), flip(), shift()]

  if (matchParentWidth) {
    middleware.push(
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxWidth: `${rects.reference.width}px`
          })
        }
      })
    )
  }

  let closedFromClickOutside = $state(false)

  // Create floating actions with strategy based on usePortal
  const strategy = usePortal ? 'absolute' : 'fixed'
  const [floatingRef, floatingContent] = createFloatingActions({
    strategy,
    placement,
    middleware
  })

  // Custom transition that mimics shadcn style
  function dropdownTransition(
    node: HTMLElement,
    { duration = 150 }: { duration?: number } = {}
  ): TransitionConfig {
    const side = placement.split('-')[0]

    // Calculate slide direction
    let slideY = 0
    let slideX = 0
    if (side === 'bottom') slideY = -8
    if (side === 'top') slideY = 8
    if (side === 'left') slideX = 8
    if (side === 'right') slideX = -8

    return {
      duration,
      css: (t) => {
        const eased = t * (2 - t) // ease-out
        return `
          opacity: ${eased};
          transform: scale(${0.95 + eased * 0.05}) translate(${slideX * (1 - eased)}px, ${slideY * (1 - eased)}px);
        `
      }
    }
  }

  export const toggle = () => {
    isOpen = !isOpen
  }

  export const close = () => {
    isOpen = false
  }

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    if (closedFromClickOutside) return
    isOpen = !isOpen
  }
</script>

<div class="flex {className}" class:w-full={fullWidth} role="menu">
  <button
    class="cursor-pointer text-left w-full min-w-0"
    use:floatingRef
    {...rest}
    onclick={handleClick}
  >
    {@render trigger?.()}
  </button>
  {#if isOpen}
    <div
      class="max-h-40 absolute z-1001"
      use:conditionalPortal
      use:floatingContent
      use:clickOutside
      onclick_outside={() => {
        closedFromClickOutside = true
        setTimeout(() => {
          closedFromClickOutside = false
        }, 100)
        isOpen = false
      }}
      transition:dropdownTransition={{ duration: 150 }}
    >
      {@render children?.()}
    </div>
  {/if}
</div>
