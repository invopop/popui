import type { Meta, StoryObj } from '@storybook/sveltekit'
import DataTable from '../lib/data-table/data-table.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import type { DataTableColumn } from '../lib/data-table/data-table-types.js'

type Product = {
	id: string
	name: string
	category: string
	price: string
	stock: number
	description: string
}

const generateProducts = (count: number): Product[] => {
	const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys', 'Sports', 'Home']
	const adjectives = ['Premium', 'Deluxe', 'Standard', 'Basic', 'Pro', 'Ultra', 'Classic']
	const nouns = ['Widget', 'Gadget', 'Device', 'Tool', 'Item', 'Product', 'Unit']

	return Array.from({ length: count }, (_, i) => ({
		id: `PRD-${(i + 1).toString().padStart(4, '0')}`,
		name: `${adjectives[i % adjectives.length]} ${nouns[i % nouns.length]} ${i + 1}`,
		category: categories[Math.floor(Math.random() * categories.length)],
		price: `$${(Math.random() * 500 + 10).toFixed(2)}`,
		stock: Math.floor(Math.random() * 100),
		description: `High-quality ${nouns[i % nouns.length].toLowerCase()} with excellent features and durability. Perfect for everyday use.`
	}))
}

const meta = {
	title: 'Components/DataTable/Column Resizing',
	component: DataTable as any,
	tags: ['autodocs'],
	decorators: [(story) => ({ Component: MarginDecorator, slot: story })],
	parameters: {
		docs: {
			description: {
				component: 'DataTable with various column resizing configurations. Drag the column borders to resize.'
			}
		}
	}
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const AllColumnsResizable: Story = {
	args: {
		data: generateProducts(25),
		columns: [
			{
				id: 'id',
				accessorKey: 'id',
				header: 'Product ID',
				cellType: 'text',
				cellConfig: { className: 'font-mono' },
				size: 120,
				minSize: 80
			},
			{
				id: 'name',
				accessorKey: 'name',
				header: 'Product Name',
				cellType: 'text',
				size: 200,
				minSize: 150
			},
			{
				id: 'category',
				accessorKey: 'category',
				header: 'Category',
				cellType: 'text',
				size: 120,
				minSize: 100
			},
			{
				id: 'price',
				accessorKey: 'price',
				header: 'Price',
				cellType: 'currency',
				size: 100,
				minSize: 80
			},
			{
				id: 'stock',
				accessorKey: 'stock',
				header: 'Stock',
				cellType: 'text',
				size: 80,
				minSize: 60
			},
			{
				id: 'description',
				accessorKey: 'description',
				header: 'Description',
				cellType: 'text',
				size: 300,
				minSize: 200
			}
		] as DataTableColumn<Product>[],
		enableSelection: false,
		enablePagination: true,
		enableColumnResizing: true,
		rowActions: []
	},
	parameters: {
		docs: {
			description: {
				story: 'All columns are resizable. Each column has minimum size constraints to prevent them from becoming too narrow.'
			}
		}
	}
}

export const MixedResizableColumns: Story = {
	args: {
		data: generateProducts(25),
		columns: [
			{
				id: 'id',
				accessorKey: 'id',
				header: 'ID',
				cellType: 'text',
				cellConfig: { className: 'font-mono' },
				enableResizing: false,
				size: 100,
				minSize: 100,
				maxSize: 100
			},
			{
				id: 'name',
				accessorKey: 'name',
				header: 'Product Name',
				cellType: 'text',
				enableResizing: true,
				size: 250,
				minSize: 150
			},
			{
				id: 'category',
				accessorKey: 'category',
				header: 'Category',
				cellType: 'text',
				enableResizing: false,
				size: 120,
				minSize: 120,
				maxSize: 120
			},
			{
				id: 'price',
				accessorKey: 'price',
				header: 'Price',
				cellType: 'currency',
				enableResizing: true,
				size: 120,
				minSize: 80,
				maxSize: 200
			},
			{
				id: 'description',
				accessorKey: 'description',
				header: 'Description',
				cellType: 'text',
				enableResizing: true,
				size: 400,
				minSize: 200
			}
		] as DataTableColumn<Product>[],
		enableSelection: false,
		enablePagination: true,
		enableColumnResizing: true,
		rowActions: []
	},
	parameters: {
		docs: {
			description: {
				story: 'Mixed configuration: ID and Category columns have fixed widths, while Name, Price, and Description are resizable.'
			}
		}
	}
}

export const ConstrainedResizing: Story = {
	args: {
		data: generateProducts(25),
		columns: [
			{
				id: 'id',
				accessorKey: 'id',
				header: 'ID',
				cellType: 'text',
				cellConfig: { className: 'font-mono' },
				size: 100,
				minSize: 80,
				maxSize: 150
			},
			{
				id: 'name',
				accessorKey: 'name',
				header: 'Product Name',
				cellType: 'text',
				size: 200,
				minSize: 150,
				maxSize: 300
			},
			{
				id: 'category',
				accessorKey: 'category',
				header: 'Category',
				cellType: 'text',
				size: 120,
				minSize: 100,
				maxSize: 180
			},
			{
				id: 'price',
				accessorKey: 'price',
				header: 'Price',
				cellType: 'currency',
				size: 100,
				minSize: 80,
				maxSize: 150
			},
			{
				id: 'stock',
				accessorKey: 'stock',
				header: 'Stock',
				cellType: 'text',
				size: 80,
				minSize: 60,
				maxSize: 120
			}
		] as DataTableColumn<Product>[],
		enableSelection: true,
		enablePagination: true,
		enableColumnResizing: true,
		rowActions: [
			{ label: 'Edit', value: 'edit' },
			{ label: 'Delete', value: 'delete', destructive: true }
		]
	},
	parameters: {
		docs: {
			description: {
				story: 'All columns are resizable but constrained with both minimum and maximum sizes. Try resizing to feel the constraints.'
			}
		}
	}
}

export const WideContentResizable: Story = {
	args: {
		data: generateProducts(15),
		columns: [
			{
				id: 'id',
				accessorKey: 'id',
				header: 'ID',
				cellType: 'text',
				cellConfig: { className: 'font-mono' },
				size: 100,
				minSize: 80
			},
			{
				id: 'name',
				accessorKey: 'name',
				header: 'Product Name',
				cellType: 'text',
				size: 300,
				minSize: 150
			},
			{
				id: 'description',
				accessorKey: 'description',
				header: 'Description',
				cellType: 'text',
				size: 500,
				minSize: 250
			},
			{
				id: 'category',
				accessorKey: 'category',
				header: 'Category',
				cellType: 'text',
				size: 150,
				minSize: 100
			}
		] as DataTableColumn<Product>[],
		enableSelection: false,
		enablePagination: true,
		enableColumnResizing: true,
		rowActions: []
	},
	parameters: {
		docs: {
			description: {
				story: 'Table with wider initial column sizes, ideal for content-heavy tables. The description column starts very wide.'
			}
		}
	}
}

export const CompactResizable: Story = {
	args: {
		data: generateProducts(30),
		columns: [
			{
				id: 'id',
				accessorKey: 'id',
				header: 'ID',
				cellType: 'text',
				cellConfig: { className: 'font-mono text-sm' },
				size: 80,
				minSize: 60
			},
			{
				id: 'name',
				accessorKey: 'name',
				header: 'Name',
				cellType: 'text',
				cellConfig: { className: 'text-sm' },
				size: 150,
				minSize: 100
			},
			{
				id: 'category',
				accessorKey: 'category',
				header: 'Category',
				cellType: 'text',
				cellConfig: { className: 'text-sm' },
				size: 100,
				minSize: 80
			},
			{
				id: 'price',
				accessorKey: 'price',
				header: 'Price',
				cellType: 'currency',
				cellConfig: { className: 'text-sm' },
				size: 80,
				minSize: 60
			},
			{
				id: 'stock',
				accessorKey: 'stock',
				header: 'Stock',
				cellType: 'text',
				cellConfig: { className: 'text-sm' },
				size: 70,
				minSize: 50
			}
		] as DataTableColumn<Product>[],
		enableSelection: true,
		enablePagination: true,
		enableColumnResizing: true,
		rowActions: []
	},
	parameters: {
		docs: {
			description: {
				story: 'Compact table with smaller initial column sizes. All columns are resizable to accommodate different viewing preferences.'
			}
		}
	}
}

export const NoResizing: Story = {
	args: {
		data: generateProducts(20),
		columns: [
			{
				id: 'id',
				accessorKey: 'id',
				header: 'ID',
				cellType: 'text',
				cellConfig: { className: 'font-mono' },
				size: 100
			},
			{
				id: 'name',
				accessorKey: 'name',
				header: 'Product Name',
				cellType: 'text',
				size: 200
			},
			{
				id: 'category',
				accessorKey: 'category',
				header: 'Category',
				cellType: 'text',
				size: 120
			},
			{
				id: 'price',
				accessorKey: 'price',
				header: 'Price',
				cellType: 'currency',
				size: 100
			}
		] as DataTableColumn<Product>[],
		enableSelection: false,
		enablePagination: true,
		enableColumnResizing: false,
		rowActions: []
	},
	parameters: {
		docs: {
			description: {
				story: 'Column resizing is completely disabled. Columns maintain their fixed widths.'
			}
		}
	}
}
