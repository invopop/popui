<script lang="ts">
  import clsx from 'clsx'
  import { clickOutside } from './clickOutside.js'

  export let position: 'left' | 'right' = 'left'
  let closedFromClickOutside = false
  let isOpen = false

  $: dropdownStyles = clsx({ 'left-0': position === 'left' }, { 'right-0': position === 'right' })

  export const toggle = () => {
    isOpen = !isOpen
  }
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
      class="{dropdownStyles} absolute max-h-40 z-10 overflow-auto mt-2"
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
