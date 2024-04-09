<script lang="ts">
  import clsx from 'clsx'
  import type { TableField, TableSortBy } from './types.js'
  import { createEventDispatcher } from 'svelte'
  import BaseDropdown from './BaseDropdown.svelte'
  import BaseTableHeaderSortBy from './BaseTableHeaderSortBy.svelte'

  const dispatch = createEventDispatcher()

  let sortDropdown: BaseDropdown

  export let field: TableField
  export let sortBy = ''
  export let sortDirection: TableSortBy

  $: outerStyles = clsx({ 'w-full': field.fullWidth })

  $: headerStyles = clsx({
    'justify-end': field.rightAlign,
    'hover:bg-neutral-50 focus:bg-neutral-100': field.sortable
  })

  function handleSortBy(event: CustomEvent) {
    sortDirection = event.detail
    dispatch('orderBy', { field: field.slug, direction: sortDirection })
    sortDropdown.toggle()
  }
</script>

<th
  scope="col"
  class="{outerStyles} bg-white text-neutral-500 group sticky z-10 top-0"
  style:min-width={field.width}
  style:max-width={field.width}
>
  <span class="flex">
    {#if field.sortable}
      <BaseDropdown bind:this={sortDropdown} fullWidth>
        <span
          slot="trigger"
          class="{headerStyles} w-full p-3 flex items-center justify-start space-x-1 text-left text-base tracking-normal whitespace-nowrap font-normal"
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
        </span>
        <BaseTableHeaderSortBy
          {sortDirection}
          isActive={sortBy === field.slug}
          on:sortBy={handleSortBy}
        />
      </BaseDropdown>
    {:else}
      <div
        class="{headerStyles} p-3 text-left text-base font-normal tracking-normal whitespace-nowrap"
      >
        {field.headerLabel}
      </div>
    {/if}
  </span>
</th>
