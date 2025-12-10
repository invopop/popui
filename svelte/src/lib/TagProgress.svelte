<script lang="ts">
  import clsx from 'clsx'
  import ProgressBarCircle from './ProgressBarCircle.svelte'
  import type { TagProgressProps } from './types'

  let { progress, variant = 'default' }: TagProgressProps = $props()

  let percentage = $derived(Math.round(progress * 100))

  let containerStyles = $derived(
    clsx('inline-flex items-center gap-1 rounded-full overflow-hidden pl-0.5 pr-1 py-0.5', {
      'bg-background-selected-inverse': variant === 'dark',
      'bg-background-default-tertiary': variant === 'default'
    })
  )

  let textStyles = $derived(
    clsx('text-xs font-medium leading-4 whitespace-nowrap', {
      'text-foreground-inverse-default': variant === 'dark',
      'text-foreground-default-default': variant === 'default'
    })
  )
</script>

<div class={containerStyles}>
  <ProgressBarCircle {progress} size={16} {variant} />
  <span class={textStyles}>{percentage}%</span>
</div>
