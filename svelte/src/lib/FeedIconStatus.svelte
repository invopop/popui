<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { FeddIconStatusProps, FeedItemStatus } from './types.ts'
  import { Warning, Failure, Queue, Running, Success, CheckBadge, Skip } from '@invopop/ui-icons'
  import type { IconSource } from '@steeze-ui/heroicons'

  let { status }: FeddIconStatusProps = $props()

  function getIconStatus(status: FeedItemStatus): IconSource | undefined {
    const icons: Record<FeedItemStatus, IconSource> = {
      failure: Failure,
      success: Success,
      run: Running,
      queued: Queue,
      alert: Warning,
      skip: Skip,
      signed: CheckBadge
    }

    return icons[status]
  }
  let iconStatus = $derived(getIconStatus(status))
</script>

{#if iconStatus}
  <div title={status}>
    <Icon src={iconStatus} class="h-4 w-4 shrink-0 text-icon" />
  </div>
{:else}
  <div class="w-4 h-4 shrink-0 bg-background-default-secondary rounded-full"></div>
{/if}
