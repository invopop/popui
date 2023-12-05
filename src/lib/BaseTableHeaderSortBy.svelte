<script lang="ts">
  import { ArrowDown, ArrowUp, Check } from '@steeze-ui/heroicons'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher } from 'svelte'
  import type { TableSortBy } from './types.js'

  const dispatch = createEventDispatcher()

  export let isActive = false
  export let sortDirection: TableSortBy

  const options = [
    { icon: ArrowUp, label: 'Sort Ascending', sortBy: 'asc' },
    { icon: ArrowDown, label: 'Sort Descending', sortBy: 'desc' }
  ]
</script>

<ul class="bg-white border border-neutral-100 rounded space-y-0.5 p-1 min-w-dropdown w-[256px]">
  {#each options as option}
    <li>
      <button
        class:bg-accent-50={isActive && sortDirection === option.sortBy}
        class="hover:bg-neutral-50 rounded py-1.5 px-2 flex items-center justify-start space-x-2 w-full"
        on:click|stopPropagation={() => {
          dispatch('sortBy', option.sortBy)
        }}
      >
        <Icon src={option.icon} class="w-5 text-neutral-500" />
        <span class="text-sm font-medium text-neutral-800 whitespace-nowrap flex-1 text-left"
          >{option.label}</span
        >
        {#if isActive && sortDirection === option.sortBy}
          <Icon src={Check} class="w-5 text-accent-500" />
        {/if}
      </button>
    </li>
  {/each}
</ul>
