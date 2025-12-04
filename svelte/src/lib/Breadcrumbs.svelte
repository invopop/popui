<script lang="ts">
  import type { BreadcrumbsProps } from './types.js'
  import { Slash } from '@invopop/ui-icons'
  import Breadcrumb from './Breadcrumb.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'

  let { breadcrumbs = [], oncopied }: BreadcrumbsProps = $props()
</script>

<ul class="flex items-center gap-1">
  {#each breadcrumbs as breadcrumb, i}
    <Breadcrumb {breadcrumb} isLast={i === breadcrumbs.length - 1} {oncopied} />

    {#if i < breadcrumbs.length - 1}
      <Icon src={Slash} class="size-4 text-icon-default-secondary" />
    {/if}
  {/each}
</ul>
