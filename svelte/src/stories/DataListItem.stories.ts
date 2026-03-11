import type { Meta, StoryObj } from '@storybook/sveltekit'

import DataListItemWithSlot from './helpers/DataListItemWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

const meta = {
  title: 'Components/DataListItem',
  component: DataListItemWithSlot as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthMdDecorator as any]
} satisfies Meta<typeof DataListItemWithSlot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Customer',
    value: 'Invopop S.L.',
    onCopy: true,
    onLink: true
  }
}

export const Monospaced: Story = {
  args: {
    label: 'Customer',
    monospaced: true,
    value: '1234-5678-234-5678',
    onCopy: true,
    onLink: true
  }
}

export const WithCopyOnly: Story = {
  args: {
    label: 'Customer',
    value: 'Invopop S.L.',
    onCopy: true
  }
}

export const WithLinkOnly: Story = {
  args: {
    label: 'Website',
    value: 'https://invopop.com',
    onLink: true
  }
}

export const WithoutButtons: Story = {
  args: {
    label: 'Description',
    value: 'This item has no action buttons'
  }
}

export const WithSlot: Story = {
  args: {
    label: 'Status',
    useSlot: true,
    onCopy: true,
    onLink: true
  }
}

export const Vertical: Story = {
  args: {
    label: 'Customer',
    value: 'Invopop S.L.',
    vertical: true,
    onCopy: true,
    onLink: true
  }
}
