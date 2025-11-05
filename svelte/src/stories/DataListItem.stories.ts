import type { Meta, StoryObj } from '@storybook/sveltekit'

import DataListItemWithSlot from './helpers/DataListItemWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

const meta = {
  title: 'Components/DataListItem',
  component: DataListItemWithSlot as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<typeof DataListItemWithSlot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Customer',
    value: 'Invopop S.L.'
  }
}

export const Monospaced: Story = {
  args: {
    label: 'Customer',
    monospaced: true,
    value: '1234-5678 012'
  }
}

export const MonospacedNums: Story = {
  args: {
    label: 'Customer',
    monospacedNums: true,
    value: '1234-5678 012'
  }
}

export const FullWidth: Story = {
  args: {
    label: 'Description',
    fullWidth: true,
    value: 'This is a long description that should take the full width available'
  }
}

export const WithSlot: Story = {
  args: {
    label: 'Status',
    useSlot: true
  }
}
