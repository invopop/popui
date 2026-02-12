<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { TooltipAutoHide, TooltipContent, TooltipTrigger } from '$lib/tooltip'
  import type { BooleanCellConfig } from '../data-table-types.js'

  let { value, config }: { value: boolean; config?: BooleanCellConfig } = $props()

  const showWhenTrue = $derived(config?.showWhenTrue ?? true)
  const showWhenFalse = $derived(config?.showWhenFalse ?? false)
  const shouldShow = $derived(value ? showWhenTrue : showWhenFalse)
  const hint = $derived(value ? config?.hintWhenTrue : config?.hintWhenFalse)
</script>

{#if shouldShow && config?.icon}
  <div class="flex justify-center">
    {#if hint}
      <TooltipAutoHide>
        <TooltipTrigger>
          <Icon src={config.icon} class={config.iconClass ?? 'size-4 text-icon'} />
        </TooltipTrigger>
        <TooltipContent>
          {hint}
        </TooltipContent>
      </TooltipAutoHide>
    {:else}
      <Icon src={config.icon} class={config.iconClass ?? 'size-4 text-icon'} />
    {/if}
  </div>
{/if}
