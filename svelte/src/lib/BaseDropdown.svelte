<script lang="ts">
  import { offset, flip, shift, size } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { clickOutside } from './clickOutside.js'
  import { portal } from 'svelte-portal'
  import type { BaseDropdownProps } from './types.js'

  let {
    isOpen = $bindable(false),
    fullWidth = false,
    placement = 'bottom-end',
    matchParentWidth = false,
    trigger,
    children,
    ...rest
  }: BaseDropdownProps = $props()

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

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement,
    middleware
  })

  let closedFromClickOutside = $state(false)

  export const toggle = () => {
    isOpen = !isOpen
  }

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    if (closedFromClickOutside) return
    isOpen = !isOpen
  }
</script>

<div class="inline-flex" class:w-full={fullWidth} role="menu">
  <button
    class="text-left"
    class:w-full={fullWidth}
    use:floatingRef
    {...rest}
    onclick={handleClick}
  >
    {@render trigger?.()}
  </button>
  {#if isOpen}
    <div
      class="max-h-40 absolute z-[1001]"
      use:portal
      use:floatingContent
      use:clickOutside
      onclick_outside={() => {
        closedFromClickOutside = true
        setTimeout(() => {
          closedFromClickOutside = false
        }, 100)
        isOpen = false
      }}
    >
      {@render children?.()}
    </div>
  {/if}
</div>
