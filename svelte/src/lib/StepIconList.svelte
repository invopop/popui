<script lang="ts">
  import { TooltipProvider } from '$lib/tooltip'
  import StepIcon from '$lib/StepIcon.svelte'
  import type { StepIconListProps } from '$lib/types.js'

  let { icons = [] }: StepIconListProps = $props()

  let maxItems = $derived(icons.length > 6 ? 5 : 6)
  let mainIcons = $derived(icons.slice(0, maxItems))
  let restIcons = $derived(icons.slice(maxItems, icons.length))
</script>

{#snippet restTooltip()}
  {#each restIcons as restIcon}
    <div>{restIcon.name}</div>
  {/each}
{/snippet}

<TooltipProvider>
  <div class="flex flex-col space-y-2 sm:flex-row sm:flex-nowrap sm:space-y-0 items-center">
    {#each mainIcons as icon, i (i)}
      <StepIcon name={icon.name} showMask={i < mainIcons.length - 1 || restIcons.length > 0}>
        <div
          class="p-1.5 rounded-md flex items-center space-x-1 bg-background-default-secondary text-icon shrink-0 {i >
          0
            ? 'ml-[-2px]'
            : ''}"
        >
          <img src={icon.url} alt={icon.name} class="size-4 shrink-0" />
        </div>
      </StepIcon>
    {/each}
    {#if restIcons.length}
      <StepIcon tooltipContent={restTooltip}>
        <div
          class="flex items-center justify-center text-icon font-medium text-sm size-7 shrink-0 rounded-md bg-background-default-secondary ml-[-1px]"
        >
          +{restIcons.length}
        </div>
      </StepIcon>
    {/if}
  </div>
</TooltipProvider>
