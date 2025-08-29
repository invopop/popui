import type { Meta, StoryObj } from '@storybook/sveltekit'

import FeedIconEvent from '../lib/FeedIconEvent.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/FeedIconEvent',
  component: FeedIconEvent,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<FeedIconEvent>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: Cog6Tooth
  }
}

export const WithSuccessStatus: Story = {
  args: {
    icon: Cog6Tooth,
    status: 'success'
  }
}

export const WithFailureStatus: Story = {
  args: {
    icon: Cog6Tooth,
    status: 'failure'
  }
}
