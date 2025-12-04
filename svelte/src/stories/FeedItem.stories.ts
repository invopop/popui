import type { Meta, StoryObj } from '@storybook/sveltekit'

import FeedItem from '../lib/FeedItem.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Workflow } from '@invopop/ui-icons'

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
    icon: Workflow
  }
}

export const WithDate: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Workflow,
    date: new Date()
  }
}

export const WithSuccessStatus: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Workflow,
    date: new Date(),
    status: 'success'
  }
}

export const WithFailureStatus: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Workflow,
    date: new Date(),
    status: 'failure'
  }
}

export const WithAlertStatus: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Workflow,
    date: new Date(),
    status: 'alert'
  }
}

export const WithQueuedStatus: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Workflow,
    date: new Date(),
    status: 'queued'
  }
}

export const WithViewButton: Story = {
  args: {
    title: 'Sam Lown ran "Send Invoice" workflow',
    icon: Workflow,
    date: new Date(),
    status: 'queued',
    viewable: true
  }
}

export const LongTextWithoutViewButton: Story = {
  args: {
    title: 'Sam Lown ran "Send long Invoice" workflow',
    icon: Workflow,
    date: new Date(),
    status: 'queued'
  }
}
