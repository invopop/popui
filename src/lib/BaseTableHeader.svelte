<script lang="ts">
  import clsx from 'clsx'
  import type { TableField } from './types.js'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let totalFields: number
  export let currentIndex: number
  export let field: TableField

  let sortDirection = 'desc'

  $: headerStyles = clsx(
    { 'pl-4': currentIndex === 0 },
    { 'pl-3': currentIndex !== 0 },
    { 'pr-4': currentIndex === totalFields - 1 },
    { 'pr-3': currentIndex < totalFields - 1 },
    { 'w-full': field.fullWidth }
  )

  function toggleDirection() {
    if (sortDirection === 'desc') {
      sortDirection = 'asc'
    } else {
      sortDirection = 'desc'
    }

    dispatch('orderBy', { field: field.slug, direction: sortDirection })
  }
</script>

<th scope="col" class="{headerStyles} text-left text-sm text-neutral-500 font-semibold py-2.5">
  <span class="flex items-center justify-start space-x-1">
    <span>{field.headerLabel}</span>
    {#if field.sortable}
      <button class="mt-px" on:click={toggleDirection}>
        {#if sortDirection === 'desc'}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 1C6.27614 1 6.5 1.22386 6.5 1.5V9.29289L7.64645 8.14645C7.84171 7.95118 8.15829 7.95118 8.35355 8.14645C8.54882 8.34171 8.54882 8.65829 8.35355 8.85355L6.35355 10.8536C6.25978 10.9473 6.13261 11 6 11C5.86739 11 5.74021 10.9473 5.64645 10.8536L3.64645 8.85355C3.45118 8.65829 3.45118 8.34171 3.64645 8.14645C3.84171 7.95118 4.15829 7.95118 4.35355 8.14645L5.5 9.29289V1.5C5.5 1.22386 5.72386 1 6 1Z"
              fill="currentColor"
            />
          </svg>
        {:else}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 11C6.27614 11 6.5 10.7761 6.5 10.5V2.70711L7.64645 3.85355C7.84171 4.04882 8.15829 4.04882 8.35355 3.85355C8.54882 3.65829 8.54882 3.34171 8.35355 3.14645L6.35355 1.14645C6.25978 1.05268 6.13261 1 6 1C5.86739 1 5.74021 1.05268 5.64645 1.14645L3.64645 3.14645C3.45118 3.34171 3.45118 3.65829 3.64645 3.85355C3.84171 4.04882 4.15829 4.04882 4.35355 3.85355L5.5 2.70711V10.5C5.5 10.7761 5.72386 11 6 11Z"
              fill="currentColor"
            />
          </svg>
        {/if}
      </button>
    {/if}
  </span>
</th>
