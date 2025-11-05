<script lang="ts">
  import clsx from 'clsx'
  import type { BaseCounterProps } from './types'

  let { value, theme = 'light' }: BaseCounterProps = $props()

  let styles = $derived(
    clsx(
      'inline-flex items-center justify-center rounded px-[3px] pb-[1.5px] pt-[2.5px] font-mono font-medium text-xs leading-none',
      {
        'bg-background-default-tertiary text-foreground': theme === 'light',
        'bg-background-accent text-foreground-inverse': theme === 'accent',
        'bg-background-selected-inverse text-foreground-inverse': theme === 'navigation'
      }
    )
  )
</script>

<div class={styles}>
  <p class="flex items-center justify-center min-w-2.5">{value}</p>
</div>
