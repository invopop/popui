<script lang="ts">
  import type { CounterWidgetProps } from './types'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Warning, Failure } from '@invopop/ui-icons'
  import ProgressBar from './ProgressBar.svelte'

  let {
    label,
    current,
    total,
    resetDate = '',
    icon,
    allowOverage = true
  }: CounterWidgetProps = $props()

  let percentage = $derived(total > 0 ? (current / total) * 100 : 0)
  let isOverage = $derived(current > total && allowOverage)
  let isCritical = $derived(percentage >= 100 || (current > total && !allowOverage))
  let isWarning = $derived(percentage >= 80 && percentage < 100)
</script>

<div class="border border-border-inverse rounded-xl w-full py-[5px] pl-2 pr-1.5 flex flex-col">
  <div class="flex items-center justify-between text-base font-medium">
    <div class="flex items-center gap-1.5">
      {#if icon}
        <Icon src={icon} class="size-3 text-icon-inverse rounded-xs" />
      {/if}
      <span class="font-medium text-foreground-inverse">
        {label}
      </span>
    </div>
    <div class="flex items-center gap-1.5">
      {#if isCritical && !isOverage}
        <Icon src={Failure} class="size-4 text-icon-critical-inverse" />
      {:else if isWarning && !isOverage}
        <Icon src={Warning} class="size-4 text-icon-warning-inverse" />
      {/if}
      <span class="font-mono text-foreground-inverse">
        {current}<span class="text-white/70">/{total}</span>
      </span>
    </div>
  </div>
  <div class="py-2">
    <ProgressBar {percentage} {current} {total} {allowOverage} />
  </div>

  {#if resetDate}
    <span class="text-sm font-normal text-foreground-inverse-secondary">
      {label} reset {resetDate}
    </span>
  {/if}
</div>
