<script lang="ts">
  import { offset, flip, shift } from 'svelte-floating-ui/dom'
  import { createFloatingActions } from 'svelte-floating-ui'
  import { clickOutside } from './clickOutside.js'

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'bottom-end',
    middleware: [offset(6), flip(), shift()]
  })

  let closedFromClickOutside = false
  export let isOpen = false

  export const toggle = () => {
    isOpen = !isOpen
  }
</script>

<div class="w-full relative">
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
      class="max-h-40 mt-2 absolute z-10"
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
