<script lang="ts">
  import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
  import type { StepIcon } from './types.js'

  export let icons: StepIcon[] = []
</script>

<div class="flex items-center overflow-x-auto">
  {#each icons as icon, i (i)}
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

    {#if i < icons.length - 1}
      <div class="h-px w-3 border border-neutral-200 mx-px flex-shrink-0" />
    {/if}
  {/each}
</div>
