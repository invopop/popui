<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { CardRelationProps } from './types.js'
  import { ChevronRight } from '@invopop/ui-icons'
  import SeparatorHorizontal from './SeparatorHorizontal.svelte'

  let { title = '', icon = undefined, items = [], onclick }: CardRelationProps = $props()
</script>

<div class="border border-neutral-100 rounded-lg">
  <button class="pl-3 py-2 pr-2 flex items-center justify-between space-x-3 w-full" {onclick}>
    <div class="flex items-center space-x-1.5">
      {#if icon}
        <Icon src={icon} class="h-4 w-4 text-neutral-500" />
      {/if}
      <span class="text-base font-medium text-neutral-800">{title}</span>
    </div>

    <Icon src={ChevronRight} class="h-4 w-4 text-neutral-500" />
  </button>
  <SeparatorHorizontal />
  <div class="py-1.5 text-sm">
    {#each items as item}
      <div class="px-3 py-1 flex items-center space-x-3">
        <div class="min-w-[88px] text-neutral-500">{item.label}</div>
        <div class="text-neutral-800">{item.value}</div>
      </div>
    {/each}
  </div>
</div>
