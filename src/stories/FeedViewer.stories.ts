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
        title: 'Juan Moliner corrected the invoice with super long name',
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

export const WithAvatar: Story = {
  args: {
    items: [
      {
        title: 'Javi corrected the invoice with super long name',
        icon: Sparkles,
        date: new Date(),
        viewable: true,
        user: {
          name: 'Javi',
          picture:
            'https://ams3.digitaloceanspaces.com/invopop-console-files-dev/b31c1a0867576428e6520f53f275d1d9c0c1cb88057f9c9436c29608beb3f739'
        }
      },
      {
        title: 'Sam Lown ran Send invoice workflow with super long name',
        icon: CircleStack,
        status: 'failure',
        date: new Date(),
        viewable: true,
        viewableText: 'View',
        user: {
          name: 'Sam'
        }
      },
      {
        title: 'Sam Lown ran Send invoice workflow with super long name',
        icon: CircleStack,
        status: 'success',
        date: new Date()
      }
    ]
  }
}

export const WithExtraText: Story = {
  args: {
    items: [
      {
        title: 'Javi created new version',
        icon: Sparkles,
        date: new Date(),
        viewable: true,
        user: {
          name: 'Javi',
          picture:
            'https://ams3.digitaloceanspaces.com/invopop-console-files-dev/b31c1a0867576428e6520f53f275d1d9c0c1cb88057f9c9436c29608beb3f739'
        },
        extraText: '09c87v67'
      },
      {
        title: 'Sam Lown ran Send invoice workflow with super long name',
        icon: CircleStack,
        status: 'failure',
        date: new Date(),
        viewable: true,
        viewableText: 'View',
        user: {
          name: 'Sam'
        }
      },
      {
        title: 'Sam Lown ran Send invoice workflow with super long name',
        icon: CircleStack,
        status: 'success',
        date: new Date()
      }
    ]
  }
}
