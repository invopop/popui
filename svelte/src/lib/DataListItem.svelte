<script lang="ts">
  import clsx from 'clsx'
  import type { DataListItemProps } from './types'

  let {
    label = '',
    value = '',
    monospaced = false,
    monospacedNums = false,
    fullWidth = false,
    children
  }: DataListItemProps = $props()

  let valueStyles = $derived(
    clsx('text-foreground font-medium text-base', {
      'font-mono': monospaced,
      'slashed-zero tabular-nums lining-nums': monospacedNums,
      'w-full': fullWidth
    })
  )
</script>

<div class="flex gap-6 items-center px-3 py-1.5 rounded-lg hover:bg-background-default-secondary">
  <div class="text-foreground-default-secondary text-base min-w-[125px]">
    {label}
  </div>
  <div class="flex gap-1 items-center">
    <div class={valueStyles}>
      {#if children}
        {@render children()}
      {:else}
        {value}
      {/if}
    </div>
  </div>
</div>
