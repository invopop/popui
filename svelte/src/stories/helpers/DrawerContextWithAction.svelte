<script lang="ts">
  import { Settings, Support } from '@invopop/ui-icons'
  import DrawerContext from '../../lib/DrawerContext.svelte'
  import TagStatus from '../../lib/TagStatus.svelte'
</script>

{#snippet upgradeAction()}
  <TagStatus status="blue" label="Upgrade" />
{/snippet}

{#snippet currentAction()}
  <TagStatus status="green" label="Current" />
{/snippet}

<DrawerContext
  items={[
    {
      label: 'Locked action',
      value: 'pro',
      icon: Support,
      action: upgradeAction,
      locked: true
    },
    {
      label: 'Enabled Action',
      value: 'enterprise',
      icon: Settings,
      action: currentAction
    }
  ]}
/>
