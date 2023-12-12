<script lang="ts">
  import { offset, flip, shift, type Placement } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { clickOutside } from './clickOutside.js'

  export let isOpen = false
  export let placement: Placement = 'bottom-end'

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement,
    middleware: [offset(6), flip(), shift()]
  })

  let closedFromClickOutside = false

  export const toggle = () => {
    isOpen = !isOpen
  }
</script>

<div class="w-full">
  <button
    use:floatingRef
    on:click|stopPropagation={async () => {
      if (closedFromClickOutside) return
      isOpen = !isOpen
    }}
    class="w-full"
  >
    <slot name="trigger" />
  </button>
  {#if isOpen}
    <div
      class="max-h-40 mt-2 absolute z-30"
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
