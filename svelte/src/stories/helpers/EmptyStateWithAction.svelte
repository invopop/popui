<script lang="ts">
  import EmptyState from '../../lib/EmptyState.svelte'
  import { Hashtag } from '@invopop/ui-icons'

  interface Props {
    title?: string
    description?: string
  }

  let { title = '', description = '' }: Props = $props()
</script>

<EmptyState iconSource={Hashtag} {title} {description}>
  <button
    class="bg-background-accent hover:bg-background-accent-hover active:bg-background-accent-press border border-border-default-secondary px-2 py-1 rounded-md font-medium text-foreground-inverse shadow-button-default active:shadow-button-pressed"
  >
    Action
  </button>
</EmptyState>
