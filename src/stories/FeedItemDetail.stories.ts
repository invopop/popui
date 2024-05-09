import type { Meta, StoryObj } from '@storybook/svelte'

import FeedItemDetail from '../lib/FeedItemDetail.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/FeedItemDetail',
  component: FeedItemDetail,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthMdDecorator]
} satisfies Meta<FeedItemDetail>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Series enumerator',
    uuid: '8ef5ac2a-1437-498b-a3d6-781234cf0ba1'
  }
}

export const WithStatus: Story = {
  args: {
    title: 'Series enumerator',
    uuid: '8ef5ac2a-1437-498b-a3d6-781234cf0ba1',
    status: 'success'
  }
}

export const WithDifferentIdLabel: Story = {
  args: {
    title: 'Series enumerator',
    uuid: '8ef5ac2a-1437-498b-a3d6-781234cf0ba1',
    status: 'success',
    idLabel: 'Intent ID:'
  }
}

export const WithLongText: Story = {
  args: {
    title: 'Series enumerator with a long text that does not fit',
    uuid: '8ef5ac2a-1437-498b-a3d6-781234cf0ba1',
    status: 'success'
  }
}

export const WithLogs: Story = {
  args: {
    title: 'Series enumerator',
    uuid: '8ef5ac2a-1437-498b-a3d6-781234cf0ba1',
    status: 'alert',
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
