<script lang="ts">
  import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
  import type { StepIcon } from './types.js'

  export let icons: StepIcon[] = []

  $: maxItems = icons.length > 6 ? 5 : 6
  $: mainIcons = icons.slice(0, maxItems)
  $: restIcons = icons.slice(maxItems + 1, icons.length)
</script>

<div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 items-center overflow-x-auto">
  {#each mainIcons as icon, i (i)}
    <Tooltip>
      <TooltipTrigger>
        <div
          class="p-1.5 border rounded-md border-neutral-200 flex items-center space-x-1 bg-white text-neutral-800 flex-shrink-0"
        >
          <img src={icon.url} alt={icon.name} class="w-4 h-4" />
        </div>
      </TooltipTrigger>
      <TooltipContent>{icon.name}</TooltipContent>
    </Tooltip>

    {#if i < mainIcons.length - 1}
      <div class="hidden sm:block h-px w-3 border border-neutral-200 mx-px flex-shrink-0" />
    {/if}
  {/each}
  {#if restIcons.length}
    <div class="hidden sm:block h-px w-3 border border-neutral-200 mx-px flex-shrink-0" />
    <Tooltip>
      <TooltipTrigger>
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
