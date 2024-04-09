<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { FeedItemStatus } from './types.ts'
  import { Alert, Failure, Queue, Running, Success } from '@invopop/ui-icons'
  import type { IconSource } from '@steeze-ui/heroicons'

  export let status: FeedItemStatus

  $: iconStatus = getIconStatus(status)

  function getIconStatus(status: FeedItemStatus): IconSource | undefined {
    const icons: Record<FeedItemStatus, IconSource> = {
      failure: Failure,
      success: Success,
      run: Running,
      queued: Queue,
      alert: Alert
    }

    return icons[status]
  }
</script>

{#if iconStatus}
  <Icon src={iconStatus} class="h-4 w-4" />
{:else}
  <div class="w-4 h-4 bg-neutral-200 rounded-full" />
{/if}
