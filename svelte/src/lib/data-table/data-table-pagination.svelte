<script lang="ts">
  import type { Table as TableType } from '@tanstack/table-core'
  import Button from '$lib/button/button.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ArrowLeft, ArrowRight, ScrollLeft, ScrollRight } from '@invopop/ui-icons'
  import { cn } from '$lib/utils.js'

  interface Props<T> {
    table: TableType<T>
    id?: string
    class?: string
    showRowsPerPage?: boolean
    rowsPerPageOptions?: number[]
    itemsLabel?: string
  }

  let {
    table,
    id,
    class: className,
    showRowsPerPage = true,
    rowsPerPageOptions = [10, 25, 50, 100],
    itemsLabel = 'items'
  }: Props<any> = $props()

  let currentPage = $derived(table.getState().pagination.pageIndex + 1)
  let totalPages = $derived(table.getPageCount())
  let totalItems = $derived(table.getFilteredRowModel().rows.length)
  let rowsPerPage = $derived(table.getState().pagination.pageSize)

  let pageInputValue = $state(`${currentPage}`)

  $effect(() => {
    pageInputValue = `${currentPage}`
  })

  function handlePageInput(event: Event) {
    const target = event.target as HTMLInputElement
    const value = parseInt(target.value)
    if (value >= 1 && value <= totalPages) {
      table.setPageIndex(value - 1)
    } else if (target.value === '') {
      // Allow empty input temporarily
      pageInputValue = ''
    }
  }

  function handlePageBlur(event: Event) {
    const target = event.target as HTMLInputElement
    const value = parseInt(target.value)
    if (isNaN(value) || value < 1) {
      pageInputValue = `${currentPage}`
    } else if (value > totalPages) {
      table.setPageIndex(totalPages - 1)
    }
  }

  function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num)
  }
</script>

<div
  {id}
  class={cn(
    'flex items-center justify-between h-11 px-4 py-[5px] bg-background backdrop-blur-[10px]',
    className
  )}
>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1.5">
        <div class="flex items-center">
          <Button
            variant="ghost"
            size="md"
            icon={ScrollLeft}
            onclick={() => table.setPageIndex(0)}
            disabled={currentPage === 1}
            class={cn(currentPage === 1 && 'pointer-events-none opacity-30')}
            aria-label="First page"
          />
          <Button
            variant="ghost"
            size="md"
            icon={ArrowLeft}
            onclick={() => table.previousPage()}
            disabled={currentPage === 1}
            class={cn(currentPage === 1 && 'pointer-events-none opacity-30')}
            aria-label="Previous page"
          />
        </div>
        <div class="flex items-center gap-1.5">
          <input
            type="number"
            bind:value={pageInputValue}
            min="1"
            max={totalPages}
            oninput={handlePageInput}
            onblur={handlePageBlur}
            class="w-12 h-8 px-2 py-1 text-base tracking-tight rounded-lg border border-border-default-secondary bg-background-default-default backdrop-blur-[2px] caret-foreground-accent text-foreground outline-none focus:ring-0 hover:border-border-default-secondary-hover focus:border-border-selected-bold focus:shadow-active [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span class="text-sm text-foreground-default-secondary whitespace-nowrap">
            / {totalPages}
          </span>
        </div>
        <div class="flex items-center">
          <Button
            variant="ghost"
            size="md"
            icon={ArrowRight}
            onclick={() => table.nextPage()}
            disabled={currentPage === totalPages}
            class={cn(currentPage === totalPages && 'pointer-events-none opacity-30')}
            aria-label="Next page"
          />
          <Button
            variant="ghost"
            size="md"
            icon={ScrollRight}
            onclick={() => table.setPageIndex(totalPages - 1)}
            disabled={currentPage === totalPages}
            class={cn(currentPage === totalPages && 'pointer-events-none opacity-30')}
            aria-label="Last page"
          />
        </div>
      </div>
      {#if showRowsPerPage}
        <div class="w-[105px]">
          <InputSelect
            value={`${rowsPerPage}`}
            options={rowsPerPageOptions.map((size) => ({ value: `${size}`, label: `${size} rows` }))}
            onchange={(value) => {
              table.setPageSize(Number(value))
            }}
            placeholder="Rows per page"
            disablePlaceholder={true}
            aria-label="Rows per page"
          />
        </div>
      {/if}
    </div>
    {#if totalItems > 0}
      <span class="text-sm text-foreground-default-secondary">
        {formatNumber(totalItems)}
        {itemsLabel}
      </span>
    {/if}
  </div>
  <slot />
</div>
