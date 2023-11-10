import type { Meta, StoryObj } from '@storybook/svelte'

import BaseTable from '../lib/BaseTable.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseTable',
  component: BaseTable,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<BaseTable>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    headers: [
      { label: 'Invoice', slug: 'code' },
      { label: 'Customer', slug: 'customer' },
      { label: 'Amount', slug: 'total' }
    ],
    data: [
      { code: 'CC2300028X', customer: 'Cobee', total: '-' },
      { code: 'CAB-0042', customer: 'Cabify, Inc', total: '€87.403,50' }
    ]
  }
}
