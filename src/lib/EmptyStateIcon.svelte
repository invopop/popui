<script lang="ts">
  import IconEmpty from './svg/IconEmpty.svelte'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'

  export let icon: IconSource | undefined = undefined
  export let title = ''
  export let description = ''
</script>

<div
  class="flex flex-col text-center items-center justify-center h-full font-sans gap-1"
  aria-label={title}
>
  {#if icon}
    <div class="relative mb-3 h-[120px] w-[352px] max-w-sm">
      <IconEmpty />
      <div class="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
        <Icon src={icon} class="h-12 w-12 text-accent-500" />
      </div>
    </div>
  {/if}
  <div class="space-y-0.5">
    <h4 class="font-medium text-base text-neutral-800 text-base tracking-tight">{title}</h4>
    <p class="max-w-xs text-base text-neutral-500 tracking-normal">{description}</p>
    <p><slot /></p>
  </div>
</div>
