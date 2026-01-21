import type { Meta, StoryObj } from '@storybook/sveltekit'
import DataTable from '../lib/data-table/data-table.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

type Task = {
	invoice: string
	signed: boolean
	state: 'paid' | 'sent' | 'empty' | 'error'
	supplier: string
	customer: string
	total: string
	createdAt: string
}

function generateUuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

const generateTasks = (count: number): Task[] => {
	const states: Task['state'][] = ['paid', 'sent', 'empty', 'error']

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

const meta = {
	title: 'Components/DataTable',
	component: DataTable as any,
	tags: ['autodocs'],
	decorators: [(story) => ({ Component: MarginDecorator, slot: story })]
} satisfies Meta<DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		data: generateTasks(50)
	}
}

export const Empty: Story = {
	args: {
		data: []
	}
}
