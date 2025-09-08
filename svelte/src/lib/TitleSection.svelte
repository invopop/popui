<script lang="ts">
  import { TitleSectionProps } from './types'

  let { title = '', children }: TitleSectionProps = $props()
</script>

<h1 class="text-neutral-800 font-medium text-lg font-sans tracking-tighter">
  {#if children}
    {@render children()}
  {:else}
    {title}
  {/if}
</h1>
