import type { Meta, StoryObj } from '@storybook/sveltekit'
import DataTable from '../lib/data-table/data-table.svelte'
import DataTableWithPaginationSlots from './helpers/DataTableWithPaginationSlots.svelte'
import type { DataTableColumn, RowAction } from '../lib/data-table/data-table-types.js'
import { Sign } from '@invopop/ui-icons'
import type { StatusType } from '$lib/types.js'

type Invoice = {
	invoice: string
	signed: boolean
	state: 'paid' | 'sent' | 'empty' | 'error'
	supplier: string
	customer: string
	total: string
	createdAt: string
}

const generateInvoices = (count: number): Invoice[] => {
	const states: Invoice['state'][] = ['paid', 'sent', 'empty', 'error']

	const suppliers = [
		'Quantum Leap',
		'EcoSphere Solutions',
		'Horizon Dynamics',
		'Future Vision Tech',
		'Summit Peak Ventures',
		'Global Nexus',
		'Stellar Innovations',
		'Prime Matrix',
		'Apex Systems',
		'Velocity Corp'
	]

	const customers = [
		'TechNova Solutions',
		'GreenWave Innovations',
		'Skyline Enterprises',
		'Quantum Dynamics',
		'BrightFuture Tech',
		'Pinnacle Ventures',
		'Digital Frontiers',
		'NextGen Industries',
		'Synergy Partners',
		'CloudFirst Inc'
	]

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const generateDate = (i: number) => {
		const year = 2025 + Math.floor(i / 12)
		const month = months[i % 12]
		const day = Math.floor(Math.random() * 28) + 1
		return `${month} ${day.toString().padStart(2, ' ')}, ${year}`
	}

	const generateAmount = () => {
		const amount = (Math.random() * 2500 + 500).toFixed(2)
		return `${amount} EUR`
	}

	return Array.from({ length: count }, (_, i) => ({
		invoice: `INV-2023-${(19 - i).toString().padStart(3, '0')}`,
		signed: Math.random() > 0.3,
		state: states[Math.floor(Math.random() * states.length)],
		supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
		customer: customers[Math.floor(Math.random() * customers.length)],
		total: generateAmount(),
		createdAt: generateDate(i)
	}))
}

const stateOptions = [
	{
		value: 'paid',
		label: 'Paid',
		color: 'green' as StatusType
	},
	{
		value: 'sent',
		label: 'Sent',
		color: 'blue' as StatusType
	},
	{
		value: 'empty',
		label: 'Empty',
		color: 'grey' as StatusType
	},
	{
		value: 'error',
		label: 'Error',
		color: 'red' as StatusType
	}
]

const columns: DataTableColumn<Invoice>[] = [
	{
		id: 'invoice',
		accessorKey: 'invoice',
		header: 'Invoice',
		cellType: 'text',
		enableSorting: false,
		enableHiding: false,
		size: 150,
		minSize: 120
	},
	{
		id: 'signed',
		accessorKey: 'signed',
		// No header - will display empty column header
		cellType: 'boolean',
		cellConfig: {
			icon: Sign,
			iconClass: 'size-4 text-text-secondary-default'
		},
		enableSorting: false,
		enableResizing: false,
		size: 60,
		minSize: 60,
		maxSize: 60
	},
	{
		id: 'state',
		accessorKey: 'state',
		header: 'State',
		cellType: 'tag',
		cellConfig: {
			options: stateOptions,
			showDot: true
		},
		filterFn: (row, id, value) => {
			return value.includes(row.state)
		},
		size: 100,
		minSize: 80
	},
	{
		id: 'supplier',
		accessorKey: 'supplier',
		header: 'Supplier',
		cellType: 'text',
		size: 220,
		minSize: 150
	},
	{
		id: 'customer',
		accessorKey: 'customer',
		header: 'Customer',
		cellType: 'text',
		size: 220,
		minSize: 150
	},
	{
		id: 'total',
		accessorKey: 'total',
		header: 'Total',
		cellType: 'currency',
		size: 140,
		minSize: 120
	},
	{
		id: 'createdAt',
		accessorKey: 'createdAt',
		header: 'Created At',
		cellType: 'date',
		size: 140,
		minSize: 120
	}
]

const rowActions: RowAction[] = [
	{ label: 'Edit', value: 'edit' },
	{ label: 'Make a copy', value: 'copy' },
	{ label: 'Favorite', value: 'favorite' },
	{ label: '', value: '', separator: true },
	{ label: 'Delete', value: 'delete', destructive: true }
]

const meta = {
	title: 'Components/DataTable',
	component: DataTable as any,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		data: generateInvoices(50),
		columns,
		getRowActions: (row) => {
			// Different actions based on invoice state
			if (row.state === 'paid') {
				return [
					{ label: 'View Receipt', value: 'receipt' },
					{ label: 'Download', value: 'download' }
				]
			}
			if (row.state === 'error') {
				return [
					{ label: 'Retry', value: 'retry' },
					{ label: 'Edit', value: 'edit' },
					{ label: '', value: '', separator: true },
					{ label: 'Delete', value: 'delete', destructive: true }
				]
			}
			// Default actions for other states
			return rowActions
		},
		onRowAction: (action, row) => {
			console.log('Action:', action, 'Row:', row)
		},
		onSelectionChange: (selectedRows) => {
			console.log('Selected rows:', selectedRows)
		},
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}

export const Empty: Story = {
	args: {
		data: [],
		columns,
		rowActions,
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}

export const WithoutSelection: Story = {
	args: {
		data: generateInvoices(20),
		columns,
		disableSelection: true,
		rowActions,
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}

export const WithoutActions: Story = {
	args: {
		data: generateInvoices(20),
		columns,
		rowActions: [],
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}

export const FixedWidthColumns: Story = {
	args: {
		data: generateInvoices(30),
		columns: [
			{
				id: 'invoice',
				accessorKey: 'invoice',
				header: 'Invoice',
				cellType: 'text',
				enableSorting: false,
				enableHiding: false,
				enableResizing: false,
				size: 200,
				minSize: 200,
				maxSize: 200
			},
			{
				id: 'state',
				accessorKey: 'state',
				header: 'State',
				cellType: 'tag',
				cellConfig: {
					options: stateOptions,
					showDot: true
				},
				enableResizing: false,
				size: 120,
				minSize: 120,
				maxSize: 120
			},
			{
				id: 'supplier',
				accessorKey: 'supplier',
				header: 'Supplier',
				cellType: 'text',
				enableResizing: true,
				size: 250,
				minSize: 150
			},
			{
				id: 'total',
				accessorKey: 'total',
				header: 'Total',
				cellType: 'currency',
				enableResizing: true,
				size: 150,
				minSize: 100
			}
		],
		disableSelection: true,
		rowActions: [],
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}

export const WideColumns: Story = {
	args: {
		data: generateInvoices(20),
		columns: [
			{
				id: 'invoice',
				accessorKey: 'invoice',
				header: 'Invoice',
				cellType: 'text',
				size: 300,
				minSize: 150
			},
			{
				id: 'supplier',
				accessorKey: 'supplier',
				header: 'Supplier',
				cellType: 'text',
				size: 400,
				minSize: 200
			},
			{
				id: 'customer',
				accessorKey: 'customer',
				header: 'Customer',
				cellType: 'text',
				size: 400,
				minSize: 200
			},
			{
				id: 'total',
				accessorKey: 'total',
				header: 'Total',
				cellType: 'currency',
				size: 200,
				minSize: 120
			}
		],
		rowActions,
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}

export const DynamicRowActions: Story = {
	args: {
		data: generateInvoices(30),
		columns,
		getRowActions: (row) => {
			// Paid invoices - limited actions
			if (row.state === 'paid') {
				return [
					{ label: 'View Receipt', value: 'receipt' },
					{ label: 'Download PDF', value: 'download' },
					{ label: 'Send Copy', value: 'send' }
				]
			}

			// Error invoices - troubleshooting actions
			if (row.state === 'error') {
				return [
					{ label: 'Retry', value: 'retry' },
					{ label: 'View Error Log', value: 'log' },
					{ label: 'Edit', value: 'edit' },
					{ label: '', value: '', separator: true },
					{ label: 'Delete', value: 'delete', destructive: true }
				]
			}

			// Sent invoices - follow-up actions
			if (row.state === 'sent') {
				return [
					{ label: 'Mark as Paid', value: 'mark-paid' },
					{ label: 'Send Reminder', value: 'reminder' },
					{ label: 'Edit', value: 'edit' }
				]
			}

			// Empty/draft state - creation actions
			return [
				{ label: 'Complete Invoice', value: 'complete' },
				{ label: 'Edit', value: 'edit' },
				{ label: '', value: '', separator: true },
				{ label: 'Delete Draft', value: 'delete', destructive: true }
			]
		},
		onRowAction: (action, row) => {
			console.log('Action:', action, 'Row:', row)
		},
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}

export const WithPaginationSlots: Story = {
	render: (args) => ({
		Component: DataTableWithPaginationSlots,
		props: args
	}),
	args: {
		data: generateInvoices(100),
		columns,
		rowActions,
		onSelectionChange: (selectedRows) => {
			console.log('Selected rows:', selectedRows)
		},
		onRowClick: (row) => {
			console.log('Row clicked:', row)
		}
	}
}
