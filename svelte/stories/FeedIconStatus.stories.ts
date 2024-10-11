import type { Meta, StoryObj } from '@storybook/svelte'

import FeedIconStatus from '../lib/FeedIconStatus.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/FeedIconStatus',
  component: FeedIconStatus,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<FeedIconStatus>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {}

export const Success: Story = {
  args: {
    status: 'success'
  }
}

export const Failure: Story = {
  args: {
    status: 'failure'
  }
}
