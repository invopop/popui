<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet
  }

  let { children }: Props = $props()
</script>

<div class="p-4 bg-background">
  {@render children?.()}
</div>
