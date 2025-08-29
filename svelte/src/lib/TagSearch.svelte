<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import type { IconTheme } from './types.ts'
  import { createEventDispatcher } from 'svelte'
  import { dispatchWcEvent } from './wcdispatch.js'
  import { resolveIcon } from './helpers.js'

  const dispatch = createEventDispatcher()

  interface Props {
    label?: string;
    icon?: IconSource | string | undefined;
    iconTheme?: IconTheme;
  }

  let { label = '', icon = undefined, iconTheme = 'default' }: Props = $props();

  let resolvedIcon: IconSource | undefined = $derived(icon)

  

  function handleClear(event: unknown) {
    const target = (event as PointerEvent).target
    dispatch('clear')
    dispatchWcEvent(target, 'clear')
  }
</script>

<span
  class:pl-2={icon}
  class:pl-3={!icon}
  class="border rounded pr-1.5 text-sm inline-flex items-center border-workspace-accent-100 bg-workspace-accent-50"
>
  {#if resolvedIcon}
    <Icon src={resolvedIcon} theme={iconTheme} class="h-4 w-4 mr-1 text-workspace-accent" />
  {/if}
  <span class="py-1 pr-2 text-workspace-accent tracking-normal">{label}</span>
  <button
    class="py-1 border-l border-workspace-accent-100 pl-1 text-neutral-500"
    onclick={handleClear}
  >
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
