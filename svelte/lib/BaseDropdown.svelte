<script lang="ts">
  import { offset, flip, shift, size, type Placement } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { clickOutside } from './clickOutside.js'
  import { portal } from 'svelte-portal'

  export let isOpen = false
  export let fullWidth = false
  export let placement: Placement = 'bottom-end'
  export let matchParentWidth = false

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

  let closedFromClickOutside = false

  export const toggle = () => {
    isOpen = !isOpen
  }
</script>

<div class="inline-flex" class:w-full={fullWidth} role="menu">
  <button
    class="text-left"
    use:floatingRef
    on:click|stopPropagation={async () => {
      if (closedFromClickOutside) return
      isOpen = !isOpen
    }}
    class:w-full={fullWidth}
  >
    <slot name="trigger" />
  </button>
  {#if isOpen}
    <div
      class="max-h-40 absolute z-40"
      use:portal
      use:floatingContent
      use:clickOutside
      on:click_outside={() => {
        closedFromClickOutside = true
        setTimeout(() => {
          closedFromClickOutside = false
        }, 100)
        isOpen = false
      }}
    >
      <slot />
    </div>
  {/if}
</div>
