import type { Meta, StoryObj } from '@storybook/svelte'

import FeedViewer from '../lib/FeedViewer.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'
import { CircleStack, Sparkles } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/FeedViewer',
  component: FeedViewer,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthMdDecorator]
} satisfies Meta<FeedViewer>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const OneItem: Story = {
  args: {
    items: [
      {
        title: 'Juan Moliner corrected the invoice',
        icon: Sparkles,
        date: new Date()
      }
    ]
  }
}

export const TwoItems: Story = {
  args: {
    items: [
      {
        title: 'Juan Moliner corrected the invoice',
        icon: Sparkles,
        date: new Date()
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'success',
        date: new Date(),
        uuid: 'e73d5d2089bc289bc2f275460'
      }
    ]
  }
}

export const ExpandableOneLevel: Story = {
  args: {
    items: [
      {
        title: 'Juan Moliner corrected the invoice',
        icon: Sparkles,
        date: new Date()
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'failure',
        date: new Date(),
        uuid: 'e73d5d2089bc289bc2f275460',
        expandable: true,
        children: [
          {
            title: 'Series enumerator',
            status: 'success',
            uuid: 'e73d5d2089bc289bc2f275460'
          },
          {
            title: 'Factura E',
            status: 'failure',
            uuid: 'e73d5d2089bc289bc2f275460'
          }
        ]
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'success',
        date: new Date(),
        uuid: 'e73d5d2089bc289bc2f275460'
      }
    ]
  }
}

export const ExpandableTwoLevels: Story = {
  args: {
    items: [
      {
        title: 'Juan Moliner corrected the invoice',
        icon: Sparkles,
        date: new Date()
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'failure',
        date: new Date(),
        uuid: 'e73d5d2089bc289bc2f275460',
        expandable: true,
        children: [
          {
            title: 'Series enumerator',
            status: 'success',
            uuid: 'e73d5d2089bc289bc2f275460'
          },
          {
            title: 'Factura E',
            status: 'failure',
            uuid: 'e73d5d2089bc289bc2f275460',
            expandable: true,
            events: [
              {
                status: {
                  label: 'RUN',
                  type: 'warning'
                },
                date: new Date()
              },
              {
                status: {
                  label: 'ERROR',
                  type: 'danger'
                },
                date: new Date(),
                message: 'User must accept legal terms'
              }
            ]
          }
        ]
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'success',
        date: new Date(),
        uuid: 'e73d5d2089bc289bc2f275460'
      }
    ]
  }
}
