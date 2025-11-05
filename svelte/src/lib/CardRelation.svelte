<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { CardRelationProps } from './types.js'
  import { ChevronRight } from '@invopop/ui-icons'

  let { title = '', icon = undefined, items = [], onclick }: CardRelationProps = $props()
</script>

<div class="border border-border-default-secondary rounded-2xl overflow-hidden">
  <button class="flex items-center gap-3 px-3 py-2 w-full cursor-pointer" {onclick}>
    <div class="flex grow items-center gap-1.5 min-w-0">
      {#if icon}
        <Icon src={icon} class="size-4 text-foreground shrink-0" />
      {/if}
      <span class="text-base font-medium text-foreground whitespace-nowrap">
        {title}
      </span>
    </div>
    <Icon src={ChevronRight} class="size-3 text-foreground shrink-0" />
  </button>
  <div class="flex flex-col gap-2 px-3 pb-3 pt-2">
    {#each items as item}
      <div class="flex items-center gap-3 text-sm">
        <div class="min-w-[88px] text-foreground-default-secondary shrink-0">{item.label}</div>
        <div class="grow text-foreground min-w-0">{item.value}</div>
      </div>
    {/each}
  </div>
</div>
