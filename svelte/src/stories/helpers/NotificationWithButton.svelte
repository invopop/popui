<script lang="ts">
  import Notification from '$lib/Notification.svelte'
  import BaseButton from '$lib/BaseButton.svelte'
  import type { Status } from '$lib/types.js'

  interface Props {
    title?: string
    description?: string
    type?: Status
  }

  let { title = '', description = '', type = 'neutral' }: Props = $props()
</script>

<Notification {title} {description} {type}>
  <BaseButton variant="outline" size="sm">Button</BaseButton>
</Notification>
