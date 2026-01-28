<script lang="ts">
  import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '$lib/tooltip'
  import type { StepIconListProps } from '$lib/types.js'

  let { icons = [] }: StepIconListProps = $props()

  let maxItems = $derived(icons.length > 6 ? 5 : 6)
  let mainIcons = $derived(icons.slice(0, maxItems))
  let restIcons = $derived(icons.slice(maxItems, icons.length))
</script>

{#snippet separator()}
  <div class="hidden sm:block h-px w-3 bg-border shrink-0"></div>
{/snippet}

<TooltipProvider>
  <div class="flex flex-col space-y-2 sm:flex-row sm:flex-nowrap sm:space-y-0 items-center">
    {#each mainIcons as icon, i (i)}
      <Tooltip>
        <TooltipTrigger class="shrink-0">
          <div
            class="p-1.5 rounded-md border border-border flex items-center space-x-1 bg-background text-icon shrink-0"
          >
            <img src={icon.url} alt={icon.name} class="size-4 shrink-0" />
          </div>
        </TooltipTrigger>
        <TooltipContent>{icon.name}</TooltipContent>
      </Tooltip>

      {#if i < mainIcons.length - 1}
        {@render separator()}
      {/if}
    {/each}
    {#if restIcons.length}
      {@render separator()}
      <Tooltip>
        <TooltipTrigger class="shrink-0">
          <div class="flex items-center justify-center text-icon font-medium text-base size-7 shrink-0">
            +{restIcons.length}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {#each restIcons as restIcon}
            <div>{restIcon.name}</div>
          {/each}
        </TooltipContent>
      </Tooltip>
    {/if}
  </div>
</TooltipProvider>
