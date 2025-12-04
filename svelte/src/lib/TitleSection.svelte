<script lang="ts">
  import type { TitleSectionProps } from './types'

  let { title = '', children }: TitleSectionProps = $props()
</script>

<h1 class="text-foreground font-medium text-lg">
  {#if children}
    {@render children()}
  {:else}
    {title}
  {/if}
</h1>
