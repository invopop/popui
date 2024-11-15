<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { AddCircle, Settings, Sidebar } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'
  import BaseCounter from './BaseCounter.svelte'
  import EmptyStateIcon from './EmptyStateIcon.svelte'
  import { slide } from 'svelte/transition'
  import { ChevronRight } from '@steeze-ui/heroicons'

  export let items: DrawerOption[] = []
  export let multiple = false

  const dispatch = createEventDispatcher()

  let liveOpen = false
  let sandboxOpen = false

  $: liveItems = items.filter((i) => !i.sandbox)
  $: sandboxItems = items.filter((i) => i.sandbox)

  $: selectedItem = items.find((i) => i.selected)
  $: if (selectedItem) {
    if (selectedItem.sandbox) {
      sandboxOpen = true
    } else {
      liveOpen = true
    }
  }
</script>

<div class="w-[300px] border border-neutral-200 rounded-md shadow-lg bg-white">
  <div class="max-h-[60vh] overflow-y-auto rounded-sm">
    <button
      class="flex items-center justify-between bg-neutral-50 border-b border-neutral-200 rounded-t-sm h-9 py-2 pl-2.5 pr-3 text-base font-medium text-neutral-800 w-full"
      on:click={() => {
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
        <BaseCounter content={liveItems.length} />
      {/if}
    </button>
    {#if liveOpen}
      <div transition:slide>
        {#if !liveItems.length}
          <div class="h-[182px]">
            <EmptyStateIcon
              icon={Sidebar}
              title="No workspaces here"
              description="Create a workspace to start"
            />
          </div>
        {/if}
        <ul class="p-1 pb-0.5 space-y-1">
          {#each liveItems as item}
            <DrawerContextItem {item} {multiple} workspace on:click />
          {/each}
        </ul>
      </div>
    {/if}
    <button
      class="flex items-center justify-between bg-neutral-50 border-b border-neutral-200 h-9 py-2 pl-2.5 pr-3 text-base font-medium text-neutral-800 w-full"
      class:border-t={liveOpen}
      on:click={() => {
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
        <BaseCounter content={sandboxItems.length} />
      {/if}
    </button>
    {#if sandboxOpen}
      <div transition:slide>
        {#if !sandboxItems.length}
          <div class="h-[182px]">
            <EmptyStateIcon
              icon={Sidebar}
              title="No workspaces here"
              description="Create a workspace to start"
            />
          </div>
        {/if}
        <ul class="p-1 pb-0.5 space-y-1">
          {#each sandboxItems as item}
            <DrawerContextItem {item} {multiple} workspace on:click />
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <ul class="px-1 space-y-1 bg-neutral-50 rounded-b border-t border-neutral-100">
    <li class="pl-1.5 py-1.5 pr-2 hover:bg-neutral-100 rounded-sm">
      <button
        class="flex items-center space-x-1.5 w-full"
        on:click={() => {
          dispatch('click', 'add')
        }}
      >
        <Icon src={AddCircle} class="w-4 h-4 text-neutral-500 flex-shrink-0" />
        <span class="text-neutral-800 tracking-tight text-base font-medium">Create workspace</span>
      </button>
    </li>
    <li class="pl-1.5 py-1.5 pr-2 hover:bg-neutral-100 rounded-sm">
      <button
        class="flex items-center space-x-1.5 w-full"
        on:click={() => {
          dispatch('click', 'settings')
        }}
      >
        <Icon src={Settings} class="w-4 h-4 text-neutral-500" />
        <span class="text-neutral-800 tracking-tight text-base font-medium">Settings</span>
      </button>
    </li>
  </ul>
</div>
