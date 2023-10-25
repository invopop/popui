<script lang="ts">
  import { clickOutside } from './clickOutside.js'
  let closedFromClickOutside = false
  let isOpen = false
</script>

<div class="relative">
  <button
    on:click={async () => {
      if (closedFromClickOutside) return
      isOpen = !isOpen
    }}
  >
    <slot name="trigger" />
  </button>
  {#if isOpen}
    <div
      class="absolute max-h-40 z-10 overflow-auto mt-2"
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
