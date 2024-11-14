<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import DrawerContextItem from './DrawerContextItem.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { AddCircle, ChevronDown, ChevronRight, Settings, Sidebar } from '@invopop/ui-icons'
  import { createEventDispatcher } from 'svelte'
  import BaseCounter from './BaseCounter.svelte'
  import EmptyStateIcon from './EmptyStateIcon.svelte'

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

<div class="w-[300px] border border-neutral-200 rounded-sm shadow-lg bg-white">
  <div class="max-h-[60vh] overflow-y-auto rounded-sm">
    <button
      class="flex items-center justify-between bg-neutral-50 border-b border-neutral-200 rounded-t-sm h-8 py-1.5 pl-1.5 pr-2 text-base font-medium text-neutral-800 w-full"
      on:click={() => {
        liveOpen = !liveOpen
      }}
    >
      <div class="flex items-center space-x-1.5">
        <Icon src={liveOpen ? ChevronDown : ChevronRight} class="h-4 w-4 text-neutral-800" />
        <span>Live</span>
      </div>
      {#if liveItems.length}
        <BaseCounter content={liveItems.length} />
      {/if}
    </button>
    {#if liveOpen}
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
    {/if}
    <button
      class="flex items-center justify-between bg-neutral-50 border-b border-neutral-200 h-8 py-1.5 pl-1.5 pr-2 text-base font-medium text-neutral-800 w-full"
      class:border-t={liveOpen}
      on:click={() => {
        sandboxOpen = !sandboxOpen
      }}
    >
      <div class="flex items-center space-x-1.5">
        <Icon src={sandboxOpen ? ChevronDown : ChevronRight} class="h-4 w-4 text-neutral-800" />
        <span>Sandbox</span>
      </div>
      {#if sandboxItems.length}
        <BaseCounter content={sandboxItems.length} />
      {/if}
    </button>
    {#if sandboxOpen}
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
    {/if}
  </div>

  <ul class="px-1 space-y-1 bg-neutral-50 rounded-b border-t border-neutral-100">
    <li class="pl-1.5 py-1.5 pr-2 hover:bg-neutral-100 rounded-sm">
      <button
        class="flex items-center space-x-2 w-full"
        on:click={() => {
          dispatch('click', 'add')
        }}
      >
        <Icon src={AddCircle} class="w-4 h-4 text-neutral-500 flex-shrink-0" />
        <span class="text-neutral-800 tracking-tight text-base">Create workspace</span>
      </button>
    </li>
    <li class="pl-1.5 py-1.5 pr-2 hover:bg-neutral-100 rounded-sm">
      <button
        class="flex items-center space-x-2 w-full"
        on:click={() => {
          dispatch('click', 'settings')
        }}
      >
        <Icon src={Settings} class="w-4 h-4 text-neutral-500" />
        <span class="text-neutral-800 tracking-tight text-base">Settings</span>
      </button>
    </li>
  </ul>
</div>
