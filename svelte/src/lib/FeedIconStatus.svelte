<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { FeddIconStatusProps, FeedItemStatus } from './types.ts'
  import { Alert, Failure, Queue, Running, Success, CheckBadge, Skip } from '@invopop/ui-icons'
  import type { IconSource } from '@steeze-ui/heroicons'

  let { status }: FeddIconStatusProps = $props()

  function getIconStatus(status: FeedItemStatus): IconSource | undefined {
    const icons: Record<FeedItemStatus, IconSource> = {
      failure: Failure,
      success: Success,
      run: Running,
      queued: Queue,
      alert: Alert,
      skip: Skip,
      signed: CheckBadge
    }

    return icons[status]
  }
  let iconStatus = $derived(getIconStatus(status))
</script>

{#if iconStatus}
  <div title={status}>
    <Icon src={iconStatus} class="h-4 w-4 flex-shrink-0" />
  </div>
{:else}
  <div class="w-4 h-4 flex-shrink-0 bg-neutral-200 rounded-full"></div>
{/if}
