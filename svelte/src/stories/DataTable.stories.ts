import type { Meta, StoryObj } from '@storybook/sveltekit'
import DataTable from '../lib/data-table/data-table.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

type Task = {
	id: string
	title: string
	status: 'backlog' | 'todo' | 'in progress' | 'done' | 'canceled'
	label: 'bug' | 'feature' | 'documentation' | 'enhancement' | 'refactor'
	uuid: string
}

function generateUuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0
		const v = c === 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

const generateTasks = (count: number): Task[] => {
	const statuses: Task['status'][] = ['backlog', 'todo', 'in progress', 'done', 'canceled']
	const labels: Task['label'][] = ['bug', 'feature', 'documentation', 'enhancement', 'refactor']
	const titles = [
		'Fix authentication bug',
		'Update documentation',
		'Implement dark mode',
		'Refactor API endpoints',
		'Add unit tests',
		'Optimize database queries',
		'Design new landing page',
		'Setup CI/CD pipeline',
		'Implement search feature',
		'Fix mobile responsiveness',
		'Add error handling',
		'Improve accessibility',
		'Update dependencies',
		'Add logging system',
		'Implement caching'
	]

	return Array.from({ length: count }, (_, i) => ({
		id: `TASK-${1000 + i}`,
		title: titles[i % titles.length],
		status: statuses[Math.floor(Math.random() * statuses.length)],
		label: labels[Math.floor(Math.random() * labels.length)],
		uuid: generateUuid()
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
