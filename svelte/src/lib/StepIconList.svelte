<script lang="ts">
  import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './tooltip'
  import type { StepIcon } from './types.js'

  interface Props {
    icons?: StepIcon[]
  }

  let { icons = [] }: Props = $props()

  let maxItems = $derived(icons.length > 6 ? 5 : 6)
  let mainIcons = $derived(icons.slice(0, maxItems))
  let restIcons = $derived(icons.slice(maxItems, icons.length))
</script>

<TooltipProvider>
  <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 items-center">
    {#each mainIcons as icon, i (i)}
      <Tooltip>
        <TooltipTrigger class="flex-shrink-0">
          <div
            class="p-1.5 border rounded-md border-neutral-200 flex items-center space-x-1 bg-white text-neutral-800"
          >
            <img src={icon.url} alt={icon.name} class="w-4 h-4" />
          </div>
        </TooltipTrigger>
        <TooltipContent>{icon.name}</TooltipContent>
      </Tooltip>

      {#if i < mainIcons.length - 1}
        <div class="hidden sm:block h-px w-3 border border-neutral-200 mx-px flex-shrink-0"></div>
      {/if}
    {/each}
    {#if restIcons.length}
      <div class="hidden sm:block h-px w-3 border border-neutral-200 mx-px flex-shrink-0"></div>
      <Tooltip>
        <TooltipTrigger class="flex-shrink-0">
          <div
            class="flex items-center justify-center text-neutral-500 font-medium text-base h-7 w-7"
          >
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
