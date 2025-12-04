<script lang="ts">
  import clsx from 'clsx'
  import type { TagStatusProps } from '$lib/types.ts'

  let { label = '', status = 'grey', dot = false }: TagStatusProps = $props()

  let tagStyles = $derived(
    clsx('rounded inline-flex items-center text-sm font-medium gap-1 box-border leading-4 py-0.5', {
      'bg-background-status-paid text-foreground-status-paid': status === 'green',
      'bg-background-status-processing text-foreground-status-processing': status === 'yellow',
      'bg-background-status-error text-foreground-status-error': status === 'red',
      'bg-background-status-draft text-foreground-status-draft': status === 'orange',
      'bg-background-status-sent text-foreground-status-sent': status === 'blue',
      'bg-background-status-registered text-foreground-status-registered': status === 'purple',
      'bg-background-status-completed text-foreground-status-completed': status === 'teal',
      'bg-background-status-received text-foreground-status-received': status === 'steelBlue',
      'bg-background-status-rejected text-foreground-status-rejected': status === 'crimson',
      'bg-sherwood-alpha-10 text-sherwood-60': status === 'olive',
      'bg-background-status-void text-foreground-default-secondary': status === 'grey',
      'shadow-avatar text-foreground-default-secondary': status === 'empty',
      'px-1.5': dot,
      'p-1!': dot && !label,
      'px-1': !dot
    })
  )

  let dotStyles = $derived(
    clsx('rounded-[2px] shrink-0', {
      'bg-icon-status-paid': status === 'green',
      'bg-icon-status-processing': status === 'yellow',
      'bg-icon-status-error': status === 'red',
      'bg-icon-status-draft': status === 'orange',
      'bg-icon-status-sent': status === 'blue',
      'bg-icon-status-registered': status === 'purple',
      'bg-icon-status-completed': status === 'teal',
      'bg-icon-status-received': status === 'steelBlue',
      'bg-icon-status-rejected': status === 'crimson',
      'bg-sherwood-50': status === 'olive',
      'bg-icon-status-void': status === 'grey',
      'bg-icon-default-secondary': status === 'empty'
    })
  )
</script>

<span class={tagStyles}>
  {#if dot}
    <span class="{dotStyles} size-2"></span>
  {/if}
  {#if label}
    <span class="whitespace-nowrap">{label}</span>
  {/if}
</span>
