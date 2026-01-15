<script lang="ts" generics="TData, TValue">
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { Add, CheckCircle } from '@invopop/ui-icons'
  import type { Column } from '@tanstack/table-core'
  import { SvelteSet } from 'svelte/reactivity'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import InputSearch from '$lib/InputSearch.svelte'
  import TagStatus from '$lib/TagStatus.svelte'
  import { cn } from '$lib/utils.js'

  let {
    column,
    title,
    options
  }: {
    column: Column<TData, TValue>
    title: string
    options: {
      label: string
      value: string
      icon?: IconSource
    }[]
  } = $props()

  const facets = $derived(column?.getFacetedUniqueValues())
  const selectedValues = $derived(new SvelteSet(column?.getFilterValue() as string[]))

  let searchValue = $state('')
  let filteredOptions = $derived(
    options.filter((opt) => opt.label.toLowerCase().includes(searchValue.toLowerCase()))
  )
</script>

<BaseDropdown>
  {#snippet trigger()}
    <button
      class="flex h-8 items-center gap-1 rounded-md border border-dashed border-border-default-secondary bg-background px-3 py-1 text-sm hover:border-border-default-secondary-hover"
    >
      <Icon src={Add} class="size-4" />
      {title}
      {#if selectedValues.size > 0}
        <div class="mx-2 h-4 w-px bg-border-default-secondary"></div>
        <TagStatus label={selectedValues.size.toString()} class="lg:hidden" />
        <div class="hidden gap-1 lg:flex">
          {#if selectedValues.size > 2}
            <TagStatus label={`${selectedValues.size} selected`} />
          {:else}
            {#each options.filter((opt) => selectedValues.has(opt.value)) as option (option)}
              <TagStatus label={option.label} />
            {/each}
          {/if}
        </div>
      {/if}
    </button>
  {/snippet}
  <DrawerContext>
    <div class="p-2">
      <InputSearch placeholder={title} bind:value={searchValue} />
    </div>
    <div class="max-h-60 overflow-y-auto">
      {#if filteredOptions.length === 0}
        <div class="py-6 text-center text-sm text-foreground-default-tertiary">
          No results found.
        </div>
      {:else}
        {#each filteredOptions as option (option)}
          {@const isSelected = selectedValues.has(option.value)}
          <button
            class="flex w-full items-center gap-2 px-2 py-1.5 text-left hover:bg-background-default-tertiary-hover"
            onclick={() => {
              if (isSelected) {
                selectedValues.delete(option.value)
              } else {
                selectedValues.add(option.value)
              }
              const filterValues = Array.from(selectedValues)
              column?.setFilterValue(filterValues.length ? filterValues : undefined)
            }}
          >
            <div
              class={cn(
                'flex size-4 items-center justify-center rounded-sm border border-border-default-secondary',
                isSelected
                  ? 'bg-background-accent text-foreground-on-accent'
                  : 'opacity-50 [&_svg]:invisible'
              )}
            >
              <Icon src={CheckCircle} class="size-3" />
            </div>
            {#if option.icon}
              <Icon src={option.icon} class="size-4 text-foreground-default-tertiary" />
            {/if}
            <span class="flex-1">{option.label}</span>
            {#if facets?.get(option.value)}
              <span class="text-xs text-foreground-default-tertiary">
                {facets.get(option.value)}
              </span>
            {/if}
          </button>
        {/each}
      {/if}
    </div>
    {#if selectedValues.size > 0}
      <div class="my-1 h-px bg-border-default-secondary"></div>
      <button
        class="w-full py-1.5 text-center text-sm hover:bg-background-default-tertiary-hover"
        onclick={() => column?.setFilterValue(undefined)}
      >
        Clear filters
      </button>
    {/if}
  </DrawerContext>
</BaseDropdown>
