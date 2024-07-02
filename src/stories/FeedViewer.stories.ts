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
        date: new Date()
      }
    ]
  }
}

export const ThreeItems: Story = {
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
        date: new Date()
      },
      {
        title: 'Javier ran Send invoice workflow',
        icon: CircleStack,
        status: 'success',
        date: new Date()
      }
    ]
  }
}

export const Viewable: Story = {
  args: {
    items: [
      {
        title: 'Juan Moliner corrected the invoice',
        icon: Sparkles,
        date: new Date(),
        viewable: true
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'failure',
        date: new Date()
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'success',
        date: new Date()
      }
    ]
  }
}

export const ViewableWithCustomText: Story = {
  args: {
    items: [
      {
        title: 'Juan Moliner corrected the invoice',
        icon: Sparkles,
        date: new Date(),
        viewable: true
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'failure',
        date: new Date(),
        viewable: true,
        viewableText: 'Preview'
      },
      {
        title: 'Sam Lown ran Send invoice workflow',
        icon: CircleStack,
        status: 'success',
        date: new Date()
      }
    ]
  }
}
