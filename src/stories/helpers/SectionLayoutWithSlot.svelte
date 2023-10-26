<script lang="ts">
  import SectionLayout from '../../lib/SectionLayout.svelte'

  export let title = ''
</script>

<SectionLayout {title}>
  <div class="border p-2">This is the content</div>
</SectionLayout>
