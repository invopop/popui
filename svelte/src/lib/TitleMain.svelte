<script lang="ts">
  import type { TitleMainProps } from './types'

  let { title = '', children }: TitleMainProps = $props()
</script>

<h1 class="text-foreground font-medium text-lg">
  {#if children}
    {@render children()}
  {:else}
    {title}
  {/if}
</h1>
