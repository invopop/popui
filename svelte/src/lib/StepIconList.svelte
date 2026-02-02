<script lang="ts">
  import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '$lib/tooltip'
  import type { StepIconListProps } from '$lib/types.js'

  let { icons = [] }: StepIconListProps = $props()

  let maxItems = $derived(icons.length > 6 ? 5 : 6)
  let mainIcons = $derived(icons.slice(0, maxItems))
  let restIcons = $derived(icons.slice(maxItems, icons.length))
</script>

<TooltipProvider>
  <div class="flex flex-col space-y-2 sm:flex-row sm:flex-nowrap sm:space-y-0 items-center">
    {#each mainIcons as icon, i (i)}
      <Tooltip>
        <TooltipTrigger class="shrink-0 {i > 0 ? 'sm:-ml-3' : ''}">
          <div
            class="p-1.5 rounded-md flex items-center space-x-1 bg-background-default-tertiary text-icon shrink-0 ring-2 ring-background"
          >
            <img src={icon.url} alt={icon.name} class="size-4 shrink-0" />
          </div>
        </TooltipTrigger>
        <TooltipContent>{icon.name}</TooltipContent>
      </Tooltip>
    {/each}
    {#if restIcons.length}
      <Tooltip>
        <TooltipTrigger class="shrink-0 sm:-ml-3">
          <div class="flex items-center justify-center text-icon font-medium text-base size-7 shrink-0 rounded-md bg-background-default-tertiary ring-2 ring-background">
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
