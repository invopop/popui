<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="flex">
  <div class="flex-1"></div>
  <div>{@render children?.()}</div>
</div>
