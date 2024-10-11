import type { Meta, StoryObj } from '@storybook/svelte'

import FeedEvents from '../lib/FeedEvents.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/FeedEvents',
  component: FeedEvents,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<FeedEvents>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    events: [
      {
        status: {
          label: 'RUN',
          type: 'yellow'
        },
        date: new Date()
      },
      {
        status: {
          label: 'OK',
          type: 'green'
        },
        date: new Date()
      }
    ]
  }
}

export const WithMessage: Story = {
  args: {
    events: [
      {
        status: {
          label: 'RUN',
          type: 'yellow'
        },
        date: new Date()
      },
      {
        status: {
          label: 'ERROR',
          type: 'red'
        },
        date: new Date(),
        message: 'User must accept legal terms'
      }
    ]
  }
}

export const WithCode: Story = {
  args: {
    events: [
      {
        status: {
          label: 'RUN',
          type: 'yellow'
        },
        date: new Date(),
        code: '1234'
      },
      {
        status: {
          label: 'ERROR',
          type: 'red'
        },
        date: new Date(),
        message: 'User must accept legal terms',
        code: 'rejected'
      }
    ]
  }
}
