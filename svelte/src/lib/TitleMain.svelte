<script lang="ts">
  import type { TitleMainProps } from './types'

  let { title = '', children }: TitleMainProps = $props()
</script>

<h1 class="text-neutral-800 font-medium text-lg font-sans tracking-tightest">
  {#if children}
    {@render children()}
  {:else}
    {title}
  {/if}
</h1>
