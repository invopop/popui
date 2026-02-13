<script lang="ts">
  import Button from '$lib/button/button.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import InputText from '$lib/InputText.svelte'
  import { ArrowLeft, ArrowRight, ScrollLeft, ScrollRight } from '@invopop/ui-icons'
  import { cn } from '$lib/utils.js'
  import clsx from 'clsx'
  import type { DataTablePaginationProps } from './data-table-types.js'

  let {
    table,
    id,
    class: className,
    showRowsPerPage = true,
    rowsPerPageOptions = [10, 25, 50, 100],
    itemsLabel = 'items',
    children,
    onPageChange,
    onPageSizeChange,
    data,
    rowCount,
    manualPagination,
    disabled = false,
    disableJumpToPage = false
  }: DataTablePaginationProps<any> = $props()

  let currentPage = $derived(table.getState().pagination.pageIndex + 1)
  let rowsPerPage = $derived(table.getState().pagination.pageSize)
  let totalItems = $derived.by(() => {
    // Use direct props for reactivity
    if (manualPagination && rowCount !== undefined) {
      return rowCount
    }
    // For client-side pagination, use data length directly
    return data?.length ?? 0
  })
  // Calculate totalPages from reactive values instead of calling table.getPageCount()
  let totalPages = $derived(Math.ceil(totalItems / rowsPerPage) || 1)

  let pageInputValue = $derived(`${currentPage}`)

  function handlePageInput(value: string) {
    const numValue = parseInt(value)
    if (numValue >= 1 && numValue <= totalPages) {
      if (manualPagination) {
        table.setPagination({ pageIndex: numValue - 1, pageSize: rowsPerPage })
      } else {
        table.setPageIndex(numValue - 1)
      }
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
      if (manualPagination) {
        table.setPagination({ pageIndex: totalPages - 1, pageSize: rowsPerPage })
      } else {
        table.setPageIndex(totalPages - 1)
      }
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
    'flex items-center justify-between h-11 px-4 py-[5px] bg-background backdrop-blur-[10px] border-t border-border',
    className
  )}
>
  <div
    class={clsx('flex items-center gap-3', {
      'pointer-events-none opacity-30': disabled
    })}
  >
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1.5">
        <div class="flex items-center">
          {#if !disableJumpToPage}
            <Button
              variant="ghost"
              size="md"
              icon={ScrollLeft}
              onclick={() => {
                if (manualPagination) {
                  table.setPagination({ pageIndex: 0, pageSize: rowsPerPage })
                } else {
                  table.setPageIndex(0)
                }
                onPageChange?.(1)
              }}
              disabled={currentPage === 1}
              class={cn(currentPage === 1 && 'pointer-events-none opacity-30')}
              aria-label="First page"
            />
          {/if}
          <Button
            variant="ghost"
            size="md"
            icon={ArrowLeft}
            onclick={() => {
              const newPage = currentPage - 1
              if (manualPagination) {
                // For manual pagination, bypass TanStack's navigation and use setPagination directly
                // to avoid clamping issues with stale pageCount
                table.setPagination({ pageIndex: newPage - 1, pageSize: rowsPerPage })
              } else {
                table.previousPage()
              }
              onPageChange?.(newPage)
            }}
            disabled={currentPage === 1}
            class={cn(currentPage === 1 && 'pointer-events-none opacity-30')}
            aria-label="Previous page"
          />
        </div>
        <div class="flex items-center gap-1.5">
          <div
            class="w-12 [&>div]:gap-0 [&_input]:[appearance:textfield] [&_input]:[&::-webkit-outer-spin-button]:appearance-none [&_input]:[&::-webkit-inner-spin-button]:appearance-none"
          >
            <InputText
              bind:value={pageInputValue}
              type="number"
              min="1"
              max={totalPages}
              size="sm"
              oninput={handlePageInput}
              onblur={handlePageBlur}
              disabled={disableJumpToPage}
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
              if (manualPagination) {
                // For manual pagination, bypass TanStack's navigation and use setPagination directly
                // to avoid clamping issues with stale pageCount
                table.setPagination({ pageIndex: newPage - 1, pageSize: rowsPerPage })
              } else {
                table.nextPage()
              }
              onPageChange?.(newPage)
            }}
            disabled={currentPage === totalPages}
            class={cn(currentPage === totalPages && 'pointer-events-none opacity-30')}
            aria-label="Next page"
          />
          {#if !disableJumpToPage}
            <Button
              variant="ghost"
              size="md"
              icon={ScrollRight}
              onclick={() => {
                if (manualPagination) {
                  table.setPagination({ pageIndex: totalPages - 1, pageSize: rowsPerPage })
                } else {
                  table.setPageIndex(totalPages - 1)
                }
                onPageChange?.(totalPages)
              }}
              disabled={currentPage === totalPages}
              class={cn(currentPage === totalPages && 'pointer-events-none opacity-30')}
              aria-label="Last page"
            />
          {/if}
        </div>
      </div>
      {#if showRowsPerPage}
        <div class="w-[105px]">
          <InputSelect
            value={`${rowsPerPage}`}
            options={rowsPerPageOptions.map((size) => ({
              value: `${size}`,
              label: `${size} rows`
            }))}
            size="sm"
            onchange={(value) => {
              const size = Number(value)
              table.setPageSize(size)
              table.setPageIndex(0)
              onPageSizeChange?.(size)
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
  {#if children}
    <div class="flex items-center gap-2">
      {@render children()}
    </div>
  {/if}
</div>
