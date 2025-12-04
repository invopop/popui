<script lang="ts">
  import clsx from 'clsx'
  import type { ProgressBarProps } from './types'

  let { percentage = 0, current = 0, total = 0, allowOverage = true }: ProgressBarProps = $props()

  let isOverage = $derived(current > total && allowOverage)
  let overagePercentage = $derived(isOverage && total > 0 ? ((current - total) / current) * 100 : 0)
  let usedPercentage = $derived(isOverage ? 100 - overagePercentage : percentage)
  let isCritical = $derived(percentage >= 100 || (current > total && !allowOverage))
  let isWarning = $derived(percentage >= 80 && percentage < 100)

  let barColor = $derived(
    clsx({
      'bg-background-critical-inverse': isCritical,
      'bg-background-warning-inverse': isWarning || isOverage,
      'bg-icon-inverse-bold': !isCritical && !isWarning && !isOverage
    })
  )

  let barWidth = $derived(isOverage ? usedPercentage : Math.min(percentage, 100))
</script>

<div class="flex gap-0.5 w-full h-1">
  {#if isOverage}
    <div class="h-1 rounded-full bg-icon-inverse-bold" style="width: {barWidth}%"></div>
    <div class="h-1 rounded-full bg-background-warning-inverse flex-1"></div>
  {:else if percentage >= 100}
    <div class="h-1 rounded-full {barColor} w-full"></div>
  {:else}
    {#if barWidth > 0}
      <div class="h-1 rounded-full {barColor}" style="width: {barWidth}%"></div>
    {/if}
    <div class="h-1 rounded-full bg-background-selected-inverse flex-1"></div>
  {/if}
</div>
