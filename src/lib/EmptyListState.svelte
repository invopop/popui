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
  class="flex flex-col text-center items-center justify-center h-full font-sans gap-1"
  aria-label={title}
>
  {#if icon}
    <div class="relative mb-3 h-[120px] w-full max-w-sm">
      <Icon
        src={icon}
        theme={iconTheme}
        class="text-neutral-400 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] -ml-[35px] rotate-[-8deg] opacity-40 scale-y-[80%] mt-0.5 z-10"
      />
      <Icon
        src={icon}
        theme={iconTheme}
        class="text-accent-500 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] z-20"
      />
      <Icon
        src={icon}
        theme={iconTheme}
        class="text-neutral-400 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ml-[35px] rotate-[8deg] opacity-40 scale-y-[80%] mt-0.5 z-10"
      />
    </div>
  {/if}
  <div class="space-y-0.5">
    <h4 class="font-medium text-base text-neutral-800 text-base tracking-tight">{title}</h4>
    <p class="max-w-xs text-base text-neutral-500 tracking-normal">{description}</p>
    <p><slot /></p>
  </div>
</div>
