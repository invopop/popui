<script lang="ts">
  import DataTable from '$lib/data-table/data-table.svelte'
  import type { DataTableColumn } from '$lib/data-table/data-table-types.js'

  let { data, columns, rowActions, onRowClick } = $props<{
    data: any[]
    columns: DataTableColumn<any>[]
    rowActions?: any[]
    onRowClick?: (row: any) => void
  }>()

  // Simulate server-side data
  const ALL_DATA = data // Store all data
  const TOTAL_COUNT = 50 // Simulate 50 records on server

  let currentPage = $state(0)
  let pageSize = $state(25)
  let displayedData = $state<any[]>([])
  let isLoading = $state(false)

  // Simulate fetching data from server
  async function fetchData(page: number, size: number) {
    isLoading = true
    console.log('[ManualPagination] Fetching page:', page + 1, 'size:', size)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const start = page * size
    const end = start + size
    displayedData = ALL_DATA.slice(start, end)

    console.log('[ManualPagination] Fetched:', displayedData.length, 'records')
    isLoading = false
  }

  // Initial load
  $effect(() => {
    fetchData(0, pageSize)
  })

  function handlePageChange(newPage: number) {
    console.log('[ManualPagination] Page changed to:', newPage)
    const newPageIndex = newPage - 1
    currentPage = newPageIndex
    fetchData(newPageIndex, pageSize)
  }

  function handlePageSizeChange(newSize: number) {
    console.log('[ManualPagination] Page size changed to:', newSize)
    pageSize = newSize
    currentPage = 0
    fetchData(0, newSize)
  }
</script>

<div class="relative h-full">
  {#if isLoading}
    <div class="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
      <div class="text-foreground">Loading...</div>
    </div>
  {/if}

  <DataTable
    data={displayedData}
    {columns}
    {rowActions}
    {onRowClick}
    manualPagination={true}
    rowCount={TOTAL_COUNT}
    initialPageSize={pageSize}
    onPageChange={handlePageChange}
    onPageSizeChange={handlePageSizeChange}
  />
</div>
