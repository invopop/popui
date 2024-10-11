<script lang="ts">
  import TitleSection from './TitleSection.svelte'
  export let title = ''
</script>

<div class="py-5">
  <TitleSection {title} />
  <div class="mt-3">
    <slot />
  </div>
</div>
