<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import type { TagSearchProps } from './types.ts'
  import { resolveIcon } from './helpers.js'

  let { label = '', icon = undefined, iconTheme = 'default', onclear }: TagSearchProps = $props()

  let resolvedIcon: IconSource | undefined = $state()

  $effect(() => {
    resolveIcon(icon).then((res) => (resolvedIcon = res))
  })

  function handleClear(event: unknown) {
    const target = (event as PointerEvent).target
    onclear?.()
  }
</script>

<span
  class:pl-2={icon}
  class:pl-3={!icon}
  class="border rounded pr-1.5 text-sm inline-flex items-center border-border-selected bg-background-selected"
>
  {#if resolvedIcon}
    <Icon src={resolvedIcon} theme={iconTheme} class="h-4 w-4 mr-1 text-foreground-selected" />
  {/if}
  <span class="py-1 pr-2 text-foreground-selected tracking-normal">{label}</span>
  <button
    aria-label="Clear"
    class="cursor-pointer py-1 border-l border-border-selected pl-1 text-foreground-default-secondary"
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
