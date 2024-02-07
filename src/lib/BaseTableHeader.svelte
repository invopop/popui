<script lang="ts">
  import clsx from 'clsx'
  import type { TableField, TableSortBy } from './types.js'
  import { createEventDispatcher } from 'svelte'
  import BaseDropdown from './BaseDropdown.svelte'
  import BaseTableHeaderSortBy from './BaseTableHeaderSortBy.svelte'

  const dispatch = createEventDispatcher()

  let sortDropdown: BaseDropdown

  export let totalFields: number
  export let currentIndex: number
  export let field: TableField
  export let sortBy = ''
  export let sortDirection: TableSortBy

  $: outerStyles = clsx({ 'w-full': field.fullWidth }, { 'hover:bg-neutral-50': field.sortable })

  $: headerStyles = clsx(
    { 'pl-4': currentIndex === 0 },
    { 'pl-3': currentIndex !== 0 },
    { 'pr-4': currentIndex === totalFields - 1 },
    { 'pr-3': currentIndex < totalFields - 1 },
    { 'justify-end': field.rightAlign }
  )

  function handleSortBy(event: CustomEvent) {
    sortDirection = event.detail
    dispatch('orderBy', { field: field.slug, direction: sortDirection })
    sortDropdown.toggle()
  }
</script>

<th scope="col" class="{outerStyles} bg-white text-neutral-600 py-2.5 group sticky z-10 top-0">
  <span class="{headerStyles} -ml-1 flex">
    {#if field.sortable}
      <BaseDropdown bind:this={sortDropdown}>
        <button
          slot="trigger"
          class="w-full flex items-center justify-start space-x-1 text-left text-sm font-medium tracking-normal"
        >
          <span>{field.headerLabel}</span>
          {#if sortBy === field.slug}
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class:rotate-180={sortDirection === 'asc'}
              class="mt-px text-neutral-300 h-3 w-3"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 1C6.27614 1 6.5 1.22386 6.5 1.5V9.29289L7.64645 8.14645C7.84171 7.95118 8.15829 7.95118 8.35355 8.14645C8.54882 8.34171 8.54882 8.65829 8.35355 8.85355L6.35355 10.8536C6.25978 10.9473 6.13261 11 6 11C5.86739 11 5.74021 10.9473 5.64645 10.8536L3.64645 8.85355C3.45118 8.65829 3.45118 8.34171 3.64645 8.14645C3.84171 7.95118 4.15829 7.95118 4.35355 8.14645L5.5 9.29289V1.5C5.5 1.22386 5.72386 1 6 1Z"
                fill="currentColor"
              />
            </svg>
          {/if}
        </button>
        <BaseTableHeaderSortBy
          {sortDirection}
          isActive={sortBy === field.slug}
          on:sortBy={handleSortBy}
        />
      </BaseDropdown>
    {:else}
      <span class="text-left text-sm font-medium tracking-normal">{field.headerLabel}</span>
    {/if}
  </span>
</th>
