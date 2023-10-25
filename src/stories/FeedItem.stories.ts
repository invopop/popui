import type { Meta, StoryObj } from '@storybook/svelte'

import FeedItem from '../lib/FeedItem.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/FeedItem',
  component: FeedItem,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<FeedItem>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Cog6Tooth
  }
}

export const WithDate: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Cog6Tooth,
    date: new Date()
  }
}

export const WithSuccessStatus: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Cog6Tooth,
    date: new Date(),
    status: 'success'
  }
}

export const WithFailureStatus: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Cog6Tooth,
    date: new Date(),
    status: 'failure'
  }
}

export const WithUuid: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Cog6Tooth,
    date: new Date(),
    status: 'failure',
    uuid: 'e73d5d20834934588127389172381789bc2f275460'
  }
}

export const Expandable: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Cog6Tooth,
    date: new Date(),
    status: 'failure',
    expandable: true
  }
}
