import type { Meta, StoryObj } from '@storybook/svelte'

import EmptyStateIcon from '../lib/EmptyStateIcon.svelte'
import { Hashtag } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/EmptyStateIcon',
  component: EmptyStateIcon,
  tags: ['autodocs']
} satisfies Meta<EmptyStateIcon>

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
    icon: Hashtag,
    title: 'No invoices yet',
    description: 'Create your first invoice to start'
  }
}

export const WithCheck: Story = {
  args: {
    icon: Hashtag,
    title: 'No invoices yet',
    description: 'Create your first invoice to start',
    check: true
  }
}
