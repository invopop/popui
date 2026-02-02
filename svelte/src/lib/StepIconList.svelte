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
        <TooltipTrigger class="shrink-0">
          <div
            class="p-1.5 rounded-md flex items-center space-x-1 bg-background-default-tertiary text-icon shrink-0 {i >
            0
              ? 'ml-[-2px]'
              : ''}"
            style={i < mainIcons.length - 1 || restIcons.length > 0
              ? `mask-image: url("data:image/svg+xml,%3Csvg width='26' height='28' viewBox='0 0 26 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.4004 0C21.7603 9.85818e-10 23.4402 0.000417824 24.7236 0.654297C25.1531 0.873098 25.552 1.14144 25.9131 1.45215C25.5579 1.90591 25.2449 2.39516 24.9805 2.91406C23.9996 4.83925 24 7.36007 24 12.4004V15.5996C24 20.6399 23.9996 23.1608 24.9805 25.0859C25.2447 25.6046 25.5581 26.0933 25.9131 26.5469C25.5519 26.8578 25.1532 27.1268 24.7236 27.3457C23.4402 27.9996 21.7603 28 18.4004 28H9.59961C6.23965 28 4.55977 27.9996 3.27637 27.3457C2.14739 26.7705 1.22954 25.8526 0.654297 24.7236C0.00041777 23.4402 9.8162e-10 21.7603 0 18.4004V9.59961C9.88222e-10 6.23965 0.000417662 4.55977 0.654297 3.27637C1.22954 2.14739 2.14739 1.22954 3.27637 0.654297C4.55977 0.000417608 6.23965 9.84018e-10 9.59961 0H18.4004Z' fill='white'/%3E%3C/svg%3E");
                 mask-size: 100% 100%;
                 mask-repeat: no-repeat;
                 -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='26' height='28' viewBox='0 0 26 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.4004 0C21.7603 9.85818e-10 23.4402 0.000417824 24.7236 0.654297C25.1531 0.873098 25.552 1.14144 25.9131 1.45215C25.5579 1.90591 25.2449 2.39516 24.9805 2.91406C23.9996 4.83925 24 7.36007 24 12.4004V15.5996C24 20.6399 23.9996 23.1608 24.9805 25.0859C25.2447 25.6046 25.5581 26.0933 25.9131 26.5469C25.5519 26.8578 25.1532 27.1268 24.7236 27.3457C23.4402 27.9996 21.7603 28 18.4004 28H9.59961C6.23965 28 4.55977 27.9996 3.27637 27.3457C2.14739 26.7705 1.22954 25.8526 0.654297 24.7236C0.00041777 23.4402 9.8162e-10 21.7603 0 18.4004V9.59961C9.88222e-10 6.23965 0.000417662 4.55977 0.654297 3.27637C1.22954 2.14739 2.14739 1.22954 3.27637 0.654297C4.55977 0.000417608 6.23965 9.84018e-10 9.59961 0H18.4004Z' fill='white'/%3E%3C/svg%3E");
                 -webkit-mask-size: 100% 100%;
                 -webkit-mask-repeat: no-repeat;`
              : ''}
          >
            <img src={icon.url} alt={icon.name} class="size-4 shrink-0" />
          </div>
        </TooltipTrigger>
        <TooltipContent>{icon.name}</TooltipContent>
      </Tooltip>
    {/each}
    {#if restIcons.length}
      <Tooltip>
        <TooltipTrigger class="shrink-0">
          <div
            class="flex items-center justify-center text-icon font-medium text-sm size-7 shrink-0 rounded-md bg-background-default-tertiary ml-[-1px]"
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
