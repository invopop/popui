<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import type { IconTheme } from './types.ts'
  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import { resolveIcon } from './helpers.js'

  const dispatch = createEventDispatcher()

  export let label = ''
  export let icon: IconSource | string | undefined = undefined
  export let iconTheme: IconTheme = 'default'

  let resolvedIcon: IconSource | undefined

  $: {
    resolveIcon(icon).then((icon) => {
      resolvedIcon = icon
    })
  }

  function handleClear(event: unknown) {
    const target = (event as PointerEvent).target
    dispatch('clear')
    dispatchWcEvent(target, 'clear')
  }
</script>

<span
  class:pl-2={icon}
  class:pl-3={!icon}
  class="border rounded pr-1.5 text-sm inline-flex items-center border-tag-accent bg-tag-accent"
>
  {#if resolvedIcon}
    <Icon src={resolvedIcon} theme={iconTheme} class="h-4 w-4 mr-1 color-tag-accent" />
  {/if}
  <span class="py-1 pr-2 color-tag-accent tracking-normal">{label}</span>
  <button class="py-1 border-l border-tag-accent pl-1 text-neutral-500" on:click={handleClear}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</span>

<style>
  .bg-tag-accent {
    background-color: color-mix(in lab, transparent 95%, var(--workspace-accent-color, #169958));
  }
  .border-tag-accent {
    border-color: color-mix(in lab, transparent 90%, var(--workspace-accent-color, #169958));
  }
  :global(.color-tag-accent) {
    color: var(--workspace-accent-color, #169958);
  }
</style>
