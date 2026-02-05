<script lang="ts">
  import DataTable from '$lib/data-table/data-table.svelte'
  import type { DataTableColumn, RowAction } from '$lib/data-table/data-table-types.js'
  import BaseButton from '$lib/BaseButton.svelte'

  type Invoice = {
    invoice: string
    signed: boolean
    state: 'paid' | 'sent' | 'empty' | 'error'
    supplier: string
    supplierEmail?: string
    customer: string
    total: string
    createdAt: string
    _highlight?: boolean // Internal flag for flash effect
    _isNew?: boolean // Flag for animation
  }

  let {
    data: initialData = [],
    columns = [],
    rowActions = [],
    onRowClick,
    getRowState,
    getRowClassName,
    ...restProps
  }: {
    data: Invoice[]
    columns: DataTableColumn<Invoice>[]
    rowActions?: RowAction[]
    onRowClick?: (row: Invoice) => void
    getRowState?: (row: Invoice) => { isError?: boolean; isSuccess?: boolean }
    getRowClassName?: (row: Invoice) => string
    [key: string]: any
  } = $props()

  let data = $state<Invoice[]>(initialData)
  let counter = $state(1)

  // Sync initial data changes
  $effect(() => {
    data = initialData
  })

  function addNewInvoice() {
    const newInvoice: Invoice = {
      invoice: `INV-2026-NEW-${counter.toString().padStart(3, '0')}`,
      signed: false,
      state: 'sent',
      supplier: 'New Supplier',
      supplierEmail: 'contact@newsupplier.com',
      customer: 'New Customer',
      total: `${(Math.random() * 2500 + 500).toFixed(2)} EUR`,
      createdAt: 'Feb  5, 2026',
      _highlight: true,
      _isNew: true
    }

    // Add new invoice at the top of the array
    data = [newInvoice, ...data]

    counter++

    // Remove animation flag after animation completes
    setTimeout(() => {
      data = data.map(invoice =>
        invoice.invoice === newInvoice.invoice
          ? { ...invoice, _isNew: false }
          : invoice
      )
    }, 500)

    // After 2 seconds, remove the highlight/flash effect
    setTimeout(() => {
      data = data.map(invoice =>
        invoice.invoice === newInvoice.invoice
          ? { ...invoice, _highlight: false }
          : invoice
      )
    }, 2000)
  }

  function handleGetRowState(row: Invoice) {
    const baseState = getRowState?.(row) || {}

    // If row has _highlight flag, show it as selected (success state)
    if (row._highlight) {
      return { ...baseState, isSuccess: true }
    }

    // Apply error state from row data
    if (row.state === 'error') {
      return { ...baseState, isError: true }
    }

    return baseState
  }

  function handleGetRowClassName(row: Invoice) {
    const baseClass = getRowClassName?.(row) || ''
    return row._isNew ? `${baseClass} slide-in-row` : baseClass
  }
</script>

<style>
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.slide-in-row) {
    animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
</style>

<div class="flex flex-col h-full">
  <div class="p-4 border-b border-border bg-background">
    <BaseButton onclick={addNewInvoice}>
      Add New Invoice
    </BaseButton>
    <div class="mt-2 text-sm text-foreground-secondary">
      Click to add new rows at the top with a slide-in animation and 2-second highlight effect.
    </div>
  </div>
  <div class="flex-1">
    <DataTable
      {data}
      {columns}
      {rowActions}
      {onRowClick}
      getRowState={handleGetRowState}
      getRowClassName={handleGetRowClassName}
      {...restProps}
    />
  </div>
</div>
