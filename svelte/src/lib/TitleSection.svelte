<script lang="ts">
  interface Props {
    title?: string;
    children?: import('svelte').Snippet;
  }

  let { title = '', children }: Props = $props();
</script>

<h1 class="text-neutral-800 font-medium text-lg font-sans tracking-tighter">
  {#if children}{@render children()}{:else}{title}{/if}
</h1>
