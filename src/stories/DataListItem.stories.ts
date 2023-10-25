import type { Meta, StoryObj } from '@storybook/svelte'

import DataListItemWithSlot from './helpers/DataListItemWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/DataListItem',
  component: DataListItemWithSlot,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<DataListItemWithSlot>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Customer',
    value: 'Invopop S.L.'
  }
}

export const WithSlot: Story = {
  args: {
    label: 'Status',
    useSlot: true
  }
}
