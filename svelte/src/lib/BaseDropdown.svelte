<script lang="ts">
  import { stopPropagation } from 'svelte/legacy';

  import { offset, flip, shift, size, type Placement } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { clickOutside } from './clickOutside.js'
  import { portal } from 'svelte-portal'

  interface Props {
    isOpen?: boolean;
    fullWidth?: boolean;
    placement?: Placement;
    matchParentWidth?: boolean;
    trigger?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let {
    isOpen = $bindable(false),
    fullWidth = false,
    placement = 'bottom-end',
    matchParentWidth = false,
    trigger,
    children,
    ...rest
  }: Props = $props();

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
</script>

<div class="inline-flex" class:w-full={fullWidth} role="menu">
  <button
    class="text-left"
    class:w-full={fullWidth}
    use:floatingRef
    {...rest}
    onclick={stopPropagation(async () => {
      if (closedFromClickOutside) return
      isOpen = !isOpen
    })}
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
