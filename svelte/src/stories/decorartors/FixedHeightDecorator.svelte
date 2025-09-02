<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="max-h-52 overflow-auto">
  {@render children?.()}
</div>
