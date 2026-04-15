<script lang="ts">
  import { Tooltip, TooltipProvider } from '$lib/tooltip'
  import { onMount, onDestroy } from 'svelte'
  import type { Snippet } from 'svelte'

  let {
    delayDuration = 700,
    children
  }: {
    delayDuration?: number
    children: Snippet
  } = $props()

  let isOpen = $state(false)

  function handleScroll() {
    isOpen = false
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll, true)
  })

  onDestroy(() => {
    window.removeEventListener('scroll', handleScroll, true)
  })
</script>

<TooltipProvider {delayDuration}>
  <Tooltip bind:open={isOpen}>
    {@render children()}
  </Tooltip>
</TooltipProvider>
