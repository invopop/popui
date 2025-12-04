import type { Meta, StoryObj } from '@storybook/sveltekit'

import Breadcrumbs from '../lib/Breadcrumbs.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthMdDecorator as any]
} satisfies Meta<Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'Invoices' },
      { label: 'F2023-101' }
    ]
  }
}

export const WithLinks: Story = {
  args: {
    breadcrumbs: [
      { label: 'Invoices', url: '#invoices' },
      { label: 'F2023-101' }
    ]
  }
}

export const WithCountry: Story = {
  args: {
    breadcrumbs: [
      { label: 'Invoices', url: '#invoices' },
      { label: 'F2023-101', country: 'es' }
    ]
  }
}

export const WithCopiable: Story = {
  args: {
    breadcrumbs: [
      { label: 'Invoices', url: '#invoices' },
      { label: 'F2023-101', copiable: true }
    ]
  }
}
