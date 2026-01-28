<script lang="ts">
  import DataTable from '$lib/data-table/data-table.svelte'
  import type { DataTableColumn } from '$lib/data-table/data-table-types.js'
  import InputSearch from '$lib/InputSearch.svelte'

  let { data, columns, rowActions, onRowClick } = $props<{
    data: any[]
    columns: DataTableColumn<any>[]
    rowActions?: any[]
    onRowClick?: (row: any) => void
  }>()

  // Simulate server-side data
  const ALL_DATA = data // Store all data
  let TOTAL_COUNT = $state(50) // Simulate total count from server
  let FILTERED_DATA = $state(ALL_DATA) // Store filtered data

  let currentPage = $state(0)
  let pageSize = $state(25)
  let displayedData = $state<any[]>([])
  let isLoading = $state(false)
  let searchQuery = $state('')

  // Simulate fetching data from server
  async function fetchData(page: number, size: number, query: string = '') {
    isLoading = true
    console.log('[ManualPagination] Fetching page:', page + 1, 'size:', size, 'query:', query)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    // Simulate server-side filtering
    let filteredResults = ALL_DATA
    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredResults = ALL_DATA.filter((item: any) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(lowerQuery)
        )
      })
    }

    FILTERED_DATA = filteredResults
    TOTAL_COUNT = filteredResults.length

    const start = page * size
    const end = start + size
    displayedData = filteredResults.slice(start, end)

    console.log('[ManualPagination] Fetched:', displayedData.length, 'records, total:', TOTAL_COUNT)
    isLoading = false
  }

  // Initial load
  $effect(() => {
    fetchData(0, pageSize, searchQuery)
  })

  function handlePageChange(newPage: number) {
    console.log('[ManualPagination] Page changed to:', newPage)
    const newPageIndex = newPage - 1
    currentPage = newPageIndex
    fetchData(newPageIndex, pageSize, searchQuery)
  }

  function handlePageSizeChange(newSize: number) {
    console.log('[ManualPagination] Page size changed to:', newSize)
    pageSize = newSize
    currentPage = 0
    fetchData(0, newSize, searchQuery)
  }

  function handleSearchChange(value: string) {
    console.log('[ManualPagination] Search query changed to:', value)
    searchQuery = value
    // Reset to page 1 when filter changes (like in console-ui SiloEntries.svelte)
    currentPage = 0
    fetchData(0, pageSize, searchQuery)
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
    initialPage={currentPage}
    initialPageSize={pageSize}
    onPageChange={handlePageChange}
    onPageSizeChange={handlePageSizeChange}
  >
    {#snippet filters()}
      <div class="flex gap-2 items-center">
        <InputSearch
          placeholder="Search invoices..."
          value={searchQuery}
          onchange={(e) => handleSearchChange(e.currentTarget.value)}
        />
        <div class="text-sm text-muted-foreground">
          Current page: {currentPage + 1}
        </div>
      </div>
    {/snippet}
  </DataTable>
</div>
