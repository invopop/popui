<script lang="ts">
  import clsx from 'clsx'
  import { Alert, Failure, Success } from '@invopop/ui-icons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { Status } from './types'

  export let message = ''
  export let type: Status = 'success'

  $: icon = getIcon(type)
  $: styles = clsx(
    { 'text-positive-500 bg-positive-50': type === 'success' },
    { 'text-danger-500 bg-danger-50': type === 'error' },
    { 'text-yellow-500 bg-yellow-50': type === 'warning' }
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
  <span class="flex-1">{message}</span>
  <slot />
</div>
