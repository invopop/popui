<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import type { IconTheme } from './types.ts'

  export let icon: IconSource | undefined = undefined
  export let iconTheme: IconTheme = 'default'
  export let title = ''
  export let description = ''
</script>

<div
  class="flex flex-col text-center items-center justify-center h-full font-sans"
  aria-label={title}
>
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="mx-auto h-18 w-18 text-neutral-300 mb-3" />
  {/if}
  <h4 class="font-medium textbase text-neutral-500">{title}</h4>
  <p class="max-w-xs text-sm text-neutral-400 mt-1">{description}</p>
  <p><slot /></p>
</div>
