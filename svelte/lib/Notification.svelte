<script lang="ts">
  import clsx from 'clsx'
  import { Alert, Failure, Success } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { Status } from './types'

  export let message = ''
  export let type: Status = 'success'

  $: icon = getIcon(type)
  $: styles = clsx(
    { 'bg-positive-50': type === 'success' },
    { 'bg-danger-50': type === 'error' },
    { 'bg-yellow-50': type === 'warning' }
  )
  $: textStyles = clsx(
    { 'text-positive-500': type === 'success' },
    { 'text-danger-500': type === 'error' },
    { 'text-yellow-500': type === 'warning' }
  )

  function getIcon(type: Status) {
    switch (type) {
      case 'success':
        return Success
      case 'error':
        return Failure
      case 'warning':
        return Alert
      default:
        return null
    }
  }
</script>

<div class="{styles} pl-3 pr-2 py-2 text-base font-medium rounded-lg flex items-center space-x-1">
  {#if icon}
    <Icon src={icon} class="h-4 w-4" />
  {/if}
  <span class="{textStyles} flex-1">{message}</span>
  <slot />
</div>
