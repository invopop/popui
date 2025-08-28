<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="flex">
  <div>{@render children?.()}</div>
  <div class="flex-1"></div>
</div>
