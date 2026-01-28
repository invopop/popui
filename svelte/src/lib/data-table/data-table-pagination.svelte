<script lang="ts">
  import Button from '$lib/button/button.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import InputText from '$lib/InputText.svelte'
  import { ArrowLeft, ArrowRight, ScrollLeft, ScrollRight } from '@invopop/ui-icons'
  import { cn } from '$lib/utils.js'
  import type { DataTablePaginationProps } from './data-table-types.js'

  let {
    table,
    id,
    class: className,
    showRowsPerPage = true,
    rowsPerPageOptions = [10, 25, 50, 100],
    itemsLabel = 'items',
    children,
    selectedSlot,
    unselectedSlot,
    onPageChange,
    onPageSizeChange,
    data,
    rowCount,
    manualPagination
  }: DataTablePaginationProps<any> = $props()

  let currentPage = $derived(table.getState().pagination.pageIndex + 1)
  let totalPages = $derived(table.getPageCount())
  let totalItems = $derived.by(() => {
    // Use direct props for reactivity
    if (manualPagination && rowCount !== undefined) {
      return rowCount
    }
    // For client-side pagination, use data length directly
    return data?.length ?? 0
  })
  let rowsPerPage = $derived(table.getState().pagination.pageSize)
  let hasSelection = $derived(Object.keys(table.getState().rowSelection).length > 0)

  let pageInputValue = $derived(`${currentPage}`)

  function handlePageInput(value: string) {
    const numValue = parseInt(value)
    if (numValue >= 1 && numValue <= totalPages) {
      table.setPageIndex(numValue - 1)
      onPageChange?.(numValue)
    }
  }

  function handlePageBlur(event: Event) {
    const target = event.target as HTMLInputElement
    const value = parseInt(target.value)
    if (isNaN(value) || value < 1) {
      target.value = `${currentPage}`
    } else if (value > totalPages) {
      target.value = `${totalPages}`
      table.setPageIndex(totalPages - 1)
      onPageChange?.(totalPages)
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
            onclick={() => {
              table.setPageIndex(0)
              onPageChange?.(1)
            }}
            disabled={currentPage === 1}
            class={cn(currentPage === 1 && 'pointer-events-none opacity-30')}
            aria-label="First page"
          />
          <Button
            variant="ghost"
            size="md"
            icon={ArrowLeft}
            onclick={() => {
              const newPage = currentPage - 1
              table.previousPage()
              onPageChange?.(newPage)
            }}
            disabled={currentPage === 1}
            class={cn(currentPage === 1 && 'pointer-events-none opacity-30')}
            aria-label="Previous page"
          />
        </div>
        <div class="flex items-center gap-1.5">
          <div
            class="w-12 [&>div]:gap-0 [&_input]:!h-7 [&_input]:[appearance:textfield] [&_input]:[&::-webkit-outer-spin-button]:appearance-none [&_input]:[&::-webkit-inner-spin-button]:appearance-none"
          >
            <InputText
              bind:value={pageInputValue}
              type="number"
              min="1"
              max={totalPages}
              oninput={handlePageInput}
              onblur={handlePageBlur}
            />
          </div>
          <span class="text-base text-foreground-default-secondary whitespace-nowrap">
            / {totalPages}
          </span>
        </div>
        <div class="flex items-center">
          <Button
            variant="ghost"
            size="md"
            icon={ArrowRight}
            onclick={() => {
              const newPage = currentPage + 1
              table.nextPage()
              onPageChange?.(newPage)
            }}
            disabled={currentPage === totalPages}
            class={cn(currentPage === totalPages && 'pointer-events-none opacity-30')}
            aria-label="Next page"
          />
          <Button
            variant="ghost"
            size="md"
            icon={ScrollRight}
            onclick={() => {
              table.setPageIndex(totalPages - 1)
              onPageChange?.(totalPages)
            }}
            disabled={currentPage === totalPages}
            class={cn(currentPage === totalPages && 'pointer-events-none opacity-30')}
            aria-label="Last page"
          />
        </div>
      </div>
      {#if showRowsPerPage}
        <div class="w-[105px] [&_select]:!h-7 [&_select]:!py-[4px]">
          <InputSelect
            value={`${rowsPerPage}`}
            options={rowsPerPageOptions.map((size) => ({
              value: `${size}`,
              label: `${size} rows`
            }))}
            onchange={(value) => {
              const size = Number(value)
              table.setPageSize(size)
              table.setPageIndex(0)
              onPageSizeChange?.(size)
              onPageChange?.(1)
            }}
            placeholder="Rows per page"
            disablePlaceholder={true}
            aria-label="Rows per page"
          />
        </div>
      {/if}
    </div>
    {#if totalItems > 0}
      <span class="text-base text-foreground-default-secondary">
        {formatNumber(totalItems)}
        {itemsLabel}
      </span>
    {/if}
  </div>
  <div class="flex items-center gap-2">
    {#if hasSelection && selectedSlot}
      {@render selectedSlot()}
    {:else if !hasSelection && unselectedSlot}
      {@render unselectedSlot()}
    {:else if children}
      {@render children()}
    {/if}
  </div>
</div>
