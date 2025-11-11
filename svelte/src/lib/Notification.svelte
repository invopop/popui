<script lang="ts">
  import clsx from 'clsx'
  import { Warning, Failure, Success, InfoBold } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { NotificationProps } from './types'

  let { title = '', description = '', type = 'neutral', children }: NotificationProps = $props()

  let icon = $derived.by(() => {
    switch (type) {
      case 'success':
        return Success
      case 'error':
        return Failure
      case 'warning':
        return Warning
      case 'info':
        return InfoBold
      case 'neutral':
        return InfoBold
      default:
        return InfoBold
    }
  })

  let containerStyles = $derived(
    clsx('flex items-center gap-1.5 px-3 py-2 rounded-xl', {
      'bg-background border border-border': type === 'neutral',
      'bg-background-info': type === 'info',
      'bg-background-success': type === 'success',
      'bg-background-warning': type === 'warning',
      'bg-background-critical': type === 'error',
      'min-h-9 rounded-[10px] pl-3 pr-1.5 py-1.5': !description
    })
  )

  let titleStyles = $derived(
    clsx('text-base font-medium leading-5 tracking-tight', {
      'text-foreground': type === 'neutral',
      'text-foreground-info': type === 'info',
      'text-foreground-success': type === 'success',
      'text-foreground-warning': type === 'warning',
      'text-foreground-critical': type === 'error'
    })
  )

  let iconStyles = $derived(
    clsx('size-4 mt-0.5', {
      'text-icon': type === 'neutral',
      'text-icon-info': type === 'info',
      'text-icon-success': type === 'success',
      'text-icon-warning': type === 'warning',
      'text-icon-critical': type === 'error'
    })
  )
</script>

<div class={containerStyles}>
  <div class="flex items-start self-stretch">
    <div class="relative size-4 shrink-0">
      {#if icon}
        <Icon src={icon} class={iconStyles} />
      {/if}
    </div>
  </div>
  <div class="flex flex-col gap-0.5 grow justify-center min-w-0">
    <p class={titleStyles}>{title}</p>
    {#if description}
      <p class="text-sm text-foreground-default-secondary leading-5 tracking-tight">
        {description}
      </p>
    {/if}
  </div>
  {@render children?.()}
</div>
