<script lang="ts">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import type { IconTheme } from '$lib/types.ts'

  export let label = ''
  export let icon: IconSource | undefined = undefined
  export let iconTheme: IconTheme = 'default'
</script>

<span
  class:pl-2={icon}
  class:pl-3={!icon}
  class="border rounded-full pr-1.5 text-sm inline-flex items-center border-accent-100 bg-accent-50"
>
  {#if icon}
    <Icon src={icon} theme={iconTheme} class="h-4 w-4 mr-1 text-accent-500" />
  {/if}
  <span class="py-1 pr-2 text-neutral-800">{label}</span>
  <button class="py-1 border-l border-accent-100 pl-1 text-neutral-500">
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
