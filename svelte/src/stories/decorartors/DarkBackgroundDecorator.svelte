<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="bg-sherwood-500 p-4 min-h-20">
  {@render children?.()}
</div>
