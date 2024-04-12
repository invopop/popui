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
  export let isFirst = false
  export let isLast = false

  $: outerStyles = clsx({
    'w-full': field.fullWidth,
    'rounded-tl-md': isFirst,
    'rounded-tr-md': isLast
  })

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
              class="mt-px text-neutral-400 h-3 w-3"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.56519 8.8272L7.9966 7.39579L8.7037 8.1029L6.41082 10.3958L6.05726 10.7493L5.70371 10.3958L3.41082 8.1029L4.11793 7.39579L5.56507 8.84293L5.61453 1.24609L6.61451 1.2526L6.56519 8.8272Z"
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
