<script lang="ts">
  import Button from '$lib/button/button.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import InputText from '$lib/InputText.svelte'
  import Skeleton from '$lib/skeleton/skeleton.svelte'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import type { DrawerOption } from '$lib/types.js'
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
    pageCount,
    manualPagination,
    disabled = false,
    disableJumpToPage = false,
    countLoading = false,
    paginationStyle = 'pages',
    rowCountCapped = false,
    locale
  }: DataTablePaginationProps<any> = $props()

  let ranged = $derived(paginationStyle === 'range')
  let jumpable = $derived(!ranged && !disableJumpToPage)

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
  // Prefer the caller-supplied pageCount when provided (manual pagination): it lets
  // consumers express "Next is available" before an exact rowCount is known. Fall
  // back to deriving from rowCount/data for the client-side default.
  let totalPages = $derived(
    manualPagination && pageCount !== undefined ? pageCount : Math.ceil(totalItems / rowsPerPage) || 1
  )

  // The rows on screen, counted from one. With manual pagination data is just
  // this page; otherwise it is every row, of which this page is a slice.
  let rangeStart = $derived((currentPage - 1) * rowsPerPage + 1)
  let rangeEnd = $derived(
    manualPagination
      ? rangeStart + (data?.length ?? 0) - 1
      : Math.min(currentPage * rowsPerPage, totalItems)
  )
  // Manual pagination without a rowCount means the total is not known, as
  // when a count gave up; client-side pagination always knows it.
  let totalKnown = $derived(!manualPagination || rowCount !== undefined)

  let pageInputValue = $derived(`${currentPage}`)

  // In the range style the rows on screen are the page size control: one
  // figure the eye already reads, rather than a select beside it repeating it.
  let sizeMenuOpen = $state(false)
  let sizeOptions: DrawerOption[] = $derived(
    rowsPerPageOptions.map((size) => ({
      label: `${size} rows`,
      value: size,
      selected: size === rowsPerPage
    }))
  )

  function changePageSize(size: number) {
    table.setPageSize(size)
    table.setPageIndex(0)
    onPageSizeChange?.(size)
  }

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

  // Undefined leaves the choice to the browser, so thousands are grouped as
  // the viewer expects: 1,234 in English, 1.234 in Spanish, 1 234 in French.
  let numberFormat = $derived(new Intl.NumberFormat(locale))

  function formatNumber(num: number): string {
    return numberFormat.format(num)
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
          {#if jumpable}
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
        {#if !ranged}
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
            <span class="text-base text-foreground-default-secondary whitespace-nowrap flex items-center gap-1.5">
              /
              {#if countLoading}
                <Skeleton class="h-4 w-8" />
              {:else}
                {formatNumber(totalPages)}
              {/if}
            </span>
          </div>
        {/if}
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
          {#if jumpable}
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
      {#if showRowsPerPage && !ranged}
        <div class="w-[105px]">
          <InputSelect
            value={`${rowsPerPage}`}
            options={rowsPerPageOptions.map((size) => ({
              value: `${size}`,
              label: `${size} rows`
            }))}
            size="sm"
            onchange={(value) => changePageSize(Number(value))}
            placeholder="Rows per page"
            disablePlaceholder={true}
            aria-label="Rows per page"
          />
        </div>
      {/if}
    </div>
    {#if ranged}
      {#if rangeEnd >= rangeStart}
        <span
          class="text-base text-foreground-default-secondary flex items-center gap-1.5 whitespace-nowrap"
          data-testid="pagination-range"
        >
          {#if showRowsPerPage}
            <BaseDropdown
              bind:isOpen={sizeMenuOpen}
              placement="top-start"
              aria-label="Rows per page"
              aria-haspopup="listbox"
              aria-expanded={sizeMenuOpen}
            >
              {#snippet trigger()}
                <span
                  class={cn(
                    'text-foreground rounded-md px-1 -mx-1 hover:bg-background-default-secondary',
                    sizeMenuOpen && 'bg-background-default-secondary'
                  )}
                >
                  {formatNumber(rangeStart)}–{formatNumber(rangeEnd)}
                </span>
              {/snippet}
              <DrawerContext
                autofocus
                widthClass="w-36"
                items={sizeOptions}
                onclick={(value) => {
                  sizeMenuOpen = false
                  changePageSize(Number(value))
                }}
              />
            </BaseDropdown>
          {:else}
            <span>{formatNumber(rangeStart)}–{formatNumber(rangeEnd)}</span>
          {/if}
          of
          {#if countLoading}
            <Skeleton class="h-4 w-10" />
          {:else if totalKnown}
            <span>{formatNumber(totalItems)}{rowCountCapped ? '+' : ''}</span>
          {:else}
            many
          {/if}
          {itemsLabel}
        </span>
      {/if}
    {:else if countLoading}
      <span class="text-base text-foreground-default-secondary flex items-center gap-1.5">
        <Skeleton class="h-4 w-10" />
        {itemsLabel}
      </span>
    {:else if totalItems > 0}
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
