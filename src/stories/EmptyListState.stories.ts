import type { Meta, StoryObj } from '@storybook/svelte'

import EmptyListState from '../lib/EmptyListState.svelte'

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

export const WithInvoiceIcon: Story = {
  args: {
    icon: 'invoices',
    title: 'No invoices yet',
    description: 'Create your first invoice to start'
  }
}

export const WithContactIcon: Story = {
  args: {
    icon: 'contacts',
    title: 'No contacts yet',
    description: 'Create your first contact to start'
  }
}

export const WithPdfIcon: Story = {
  args: {
    icon: 'pdf',
    title: 'No PDFs yet',
    description: 'Create your first pdf to start'
  }
}

export const WithFileIcon: Story = {
  args: {
    icon: 'file',
    title: 'No Files yet',
    description: 'Create your first file to start'
  }
}

export const WithProductIcon: Story = {
  args: {
    icon: 'products',
    title: 'No Products yet',
    description: 'Create your first product to start'
  }
}

export const WithNoResultsIcon: Story = {
  args: {
    icon: 'no-results',
    title: 'No results',
    description: 'Please update your search criteria'
  }
}
