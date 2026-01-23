<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()
</script>

<div
  class="flex items-center h-7 rounded-md border border-border-default-secondary divide-x divide-border-default-secondary"
>
  {@render children()}
</div>
