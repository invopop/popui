<script lang="ts">
  import type { Table as TableType } from '@tanstack/table-core'
  import BaseButton from '$lib/BaseButton.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronRight, ChevronLeft } from '@invopop/ui-icons'

  interface Props<T> {
    table: TableType<T>
  }

  let { table }: Props<any> = $props()
</script>

<div class="flex items-center justify-between px-2">
  <div class="text-muted-foreground flex-1 text-sm">
    {table.getFilteredSelectedRowModel().rows.length} of
    {table.getFilteredRowModel().rows.length} row(s) selected.
  </div>
  <div class="flex items-center space-x-6 lg:space-x-8">
    <div class="flex items-center space-x-2">
      <p class="text-sm font-medium">Rows per page</p>
      <InputSelect
        value={`${table.getState().pagination.pageSize}`}
        options={[10, 20, 30, 40, 50].map((size) => ({ value: `${size}`, label: `${size}` }))}
        onchange={(value) => {
          table.setPageSize(Number(value))
        }}
      />
    </div>
    <div class="flex w-[100px] items-center justify-center text-sm font-medium">
      Page {table.getState().pagination.pageIndex + 1} of
      {table.getPageCount()}
    </div>
    <div class="flex items-center space-x-2">
      <BaseButton
        variant="outline"
        class="hidden size-8 p-0 lg:flex"
        onclick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {#snippet children()}
          <span class="sr-only">Go to first page</span>
          <Icon src={ChevronLeft} class="size-4" />
        {/snippet}
      </BaseButton>
      <BaseButton
        variant="outline"
        class="size-8 p-0"
        onclick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {#snippet children()}
          <span class="sr-only">Go to previous page</span>
          <Icon src={ChevronLeft} class="size-4" />
        {/snippet}
      </BaseButton>
      <BaseButton
        variant="outline"
        class="size-8 p-0"
        onclick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {#snippet children()}
          <span class="sr-only">Go to next page</span>
          <Icon src={ChevronRight} class="size-4" />
        {/snippet}
      </BaseButton>
      <BaseButton
        variant="outline"
        class="hidden size-8 p-0 lg:flex"
        onclick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {#snippet children()}
          <span class="sr-only">Go to last page</span>
          <Icon src={ChevronRight} class="size-4" />
        {/snippet}
      </BaseButton>
    </div>
  </div>
</div>
