<script lang="ts">
  import SectionLayout from '$lib/SectionLayout.svelte'

  interface Props {
    title?: string;
  }

  let { title = '' }: Props = $props();
</script>

<SectionLayout {title}>
  <div class="border p-2">This is the content</div>
</SectionLayout>
