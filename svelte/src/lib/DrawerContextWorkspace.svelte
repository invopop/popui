<script lang="ts">
  import type { DrawerContextWorkspaceProps } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { AddCircle, ExternalLink, Workspace } from '@invopop/ui-icons'
  import BaseCounter from './BaseCounter.svelte'
  import EmptyState from './EmptyState.svelte'
  import { slide } from 'svelte/transition'
  import { ChevronRight } from '@steeze-ui/heroicons'

  let { items = [], multiple = false, onclick }: DrawerContextWorkspaceProps = $props()
  let liveOpen = $state(false)
  let sandboxOpen = $state(false)
  let liveItems = $derived(items.filter((i) => !i.sandbox))
  let sandboxItems = $derived(items.filter((i) => i.sandbox))
  let selectedItem = $derived(items.find((i) => i.selected))

  $effect(() => {
    if (selectedItem) {
      if (selectedItem.sandbox) {
        sandboxOpen = true
      } else {
        liveOpen = true
      }
    }
  })
</script>

<div class="w-[300px] border border-neutral-200 rounded-md shadow-lg bg-white">
  <div class="max-h-[550px] overflow-hidden rounded-t-md">
    <button
      class="cursor-pointer flex items-center justify-between bg-neutral-50 border-b border-neutral-200 rounded-t-sm h-9 py-2 pl-2.5 pr-3 text-base font-medium text-neutral-800 w-full"
      onclick={() => {
        if (liveOpen) return
        liveOpen = true
        sandboxOpen = false
      }}
    >
      <div class="flex items-center space-x-1.5">
        <Icon
          src={ChevronRight}
          class="h-4 w-4 text-neutral-500 transition-all transform {liveOpen ? 'rotate-90' : ''}"
        />
        <span>Live</span>
      </div>
      {#if liveItems.length}
        <BaseCounter value={liveItems.length} />
      {/if}
    </button>
    {#if liveOpen}
      <div transition:slide class="max-h-[475px] overflow-auto">
        {#if !liveItems.length}
          <div class="h-[182px] overflow-x-hidden">
            <EmptyState
              iconSource={Workspace}
              title="No workspaces here"
              description="Create a workspace to start"
            />
          </div>
        {/if}
        <ul class="p-1 space-y-1">
          {#each liveItems as item}
            <DrawerContextItem {item} {multiple} workspace {onclick} />
          {/each}
        </ul>
      </div>
    {/if}
    <button
      class="cursor-pointer flex items-center justify-between bg-neutral-50 border-b border-neutral-200 h-9 py-2 pl-2.5 pr-3 text-base font-medium text-neutral-800 w-full"
      class:border-t={liveOpen}
      onclick={() => {
        if (sandboxOpen) return
        sandboxOpen = true
        liveOpen = false
      }}
    >
      <div class="flex items-center space-x-1.5">
        <Icon
          src={ChevronRight}
          class="h-4 w-4 text-neutral-500 transition-all transform {sandboxOpen ? 'rotate-90' : ''}"
        />
        <span>Sandbox</span>
      </div>
      {#if sandboxItems.length}
        <BaseCounter value={sandboxItems.length} />
      {/if}
    </button>
    {#if sandboxOpen}
      <div transition:slide class="max-h-[475px] overflow-auto">
        {#if !sandboxItems.length}
          <div class="h-[182px] overflow-x-hidden">
            <EmptyState
              iconSource={Workspace}
              title="No workspaces here"
              description="Create a workspace to start"
            />
          </div>
        {/if}
        <ul class="p-1 space-y-1">
          {#each sandboxItems as item}
            <DrawerContextItem {item} {multiple} workspace {onclick} />
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <ul class="px-1 space-y-1 bg-neutral-50 rounded-b border-t border-neutral-100 py-1">
    <li class="pl-1.5 py-1.5 pr-2 hover:bg-neutral-100 rounded-sm">
      <button
        class="cursor-pointer flex items-center justify-between w-full"
        onclick={() => {
          onclick?.('add')
        }}
      >
        <div class="flex items-center space-x-1.5">
          <Icon src={AddCircle} class="w-4 h-4 text-neutral-800 shrink-0" />
          <span class="text-neutral-800 tracking-tight text-base font-medium">Create workspace</span
          >
        </div>

        <Icon src={ExternalLink} class="w-4 h-4 text-neutral-400 shrink-0" />
      </button>
    </li>
  </ul>
</div>
