<script lang="ts">
  import TitleSection from './TitleSection.svelte'
  import type { SectionLayoutProps } from './types'

  let { title = '', children }: SectionLayoutProps = $props()
</script>

<div class="py-5">
  <TitleSection {title} />
  <div class="mt-3">
    {@render children?.()}
  </div>
</div>
