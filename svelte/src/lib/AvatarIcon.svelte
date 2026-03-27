<script lang="ts">
  import { TooltipAutoHide, TooltipContent, TooltipTrigger } from '$lib/tooltip'
  import type { AvatarIconProps } from '$lib/types.js'

  let { name, showMask = false, size = 'md', tooltipContent, children }: AvatarIconProps = $props()

  const masks = {
    md: `url("data:image/svg+xml,%3Csvg width='26' height='28' viewBox='0 0 26 28' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.4004 0C21.7603 9.85818e-10 23.4402 0.000417824 24.7236 0.654297C25.1531 0.873098 25.552 1.14144 25.9131 1.45215C25.5579 1.90591 25.2449 2.39516 24.9805 2.91406C23.9996 4.83925 24 7.36007 24 12.4004V15.5996C24 20.6399 23.9996 23.1608 24.9805 25.0859C25.2447 25.6046 25.5581 26.0933 25.9131 26.5469C25.5519 26.8578 25.1532 27.1268 24.7236 27.3457C23.4402 27.9996 21.7603 28 18.4004 28H9.59961C6.23965 28 4.55977 27.9996 3.27637 27.3457C2.14739 26.7705 1.22954 25.8526 0.654297 24.7236C0.00041777 23.4402 9.8162e-10 21.7603 0 18.4004V9.59961C9.88222e-10 6.23965 0.000417662 4.55977 0.654297 3.27637C1.22954 2.14739 2.14739 1.22954 3.27637 0.654297C4.55977 0.000417608 6.23965 9.84018e-10 9.59961 0H18.4004Z' fill='white'/%3E%3C/svg%3E")`,
    sm: `url("data:image/svg+xml,%3Csvg width='23' height='24' viewBox='0 0 23 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.5996 1.63272e-09C19.8398 1.63272e-09 20.9608 -0.000427061 21.8164 0.435547C21.9034 0.479874 21.9882 0.527831 22.0713 0.578125C21.9172 0.80011 21.778 1.03354 21.6543 1.27637C21.0004 2.55977 21 4.23965 21 7.59961V16.4004C21 19.7603 21.0004 21.4402 21.6543 22.7236C21.7779 22.9662 21.9174 23.1991 22.0713 23.4209C21.9881 23.4713 21.9035 23.52 21.8164 23.5645C20.9608 24.0004 19.8398 24 17.5996 24H6.40039C4.16018 24 3.03924 24.0004 2.18359 23.5645C1.43109 23.181 0.819016 22.5689 0.435547 21.8164C-0.000427061 20.9608 1.63272e-09 19.8398 1.63272e-09 17.5996V6.40039C1.63272e-09 4.16018 -0.000427061 3.03924 0.435547 2.18359C0.819016 1.43109 1.43109 0.819016 2.18359 0.435547C3.03924 -0.000427061 4.16018 1.63272e-09 6.40039 1.63272e-09H17.5996Z' fill='white'/%3E%3C/svg%3E")`
  }
</script>

<TooltipAutoHide>
  <TooltipTrigger class="shrink-0">
    <div
      style={showMask
        ? `mask-image: ${masks[size]};
           mask-size: 100% 100%;
           mask-repeat: no-repeat;
           -webkit-mask-image: ${masks[size]};
           -webkit-mask-size: 100% 100%;
           -webkit-mask-repeat: no-repeat;`
        : ''}
    >
      {@render children()}
    </div>
  </TooltipTrigger>
  <TooltipContent>
    {#if tooltipContent}
      {@render tooltipContent()}
    {:else if name}
      {name}
    {/if}
  </TooltipContent>
</TooltipAutoHide>
