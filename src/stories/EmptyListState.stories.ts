import type { Meta, StoryObj } from '@storybook/svelte'

import EmptyListState from '../lib/EmptyListState.svelte'
import { EmptyState } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/EmptyListState',
  component: EmptyListState,
  tags: ['autodocs']
} satisfies Meta<EmptyListState>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const WithoutIcon: Story = {
  args: {
    title: 'No invoices yet',
    description: 'Create your first invoice to start'
  }
}

export const WithIcon: Story = {
  args: {
    icon: EmptyState,
    title: 'No invoices yet',
    description: 'Create your first invoice to start'
  }
}
