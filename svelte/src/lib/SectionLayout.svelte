<script lang="ts">
  import TitleSection from './TitleSection.svelte'
  interface Props {
    title?: string;
    children?: import('svelte').Snippet;
  }

  let { title = '', children }: Props = $props();
</script>

<div class="py-5">
  <TitleSection {title} />
  <div class="mt-3">
    {@render children?.()}
  </div>
</div>
