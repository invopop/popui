import type { Meta, StoryObj } from '@storybook/sveltekit'
import { Hashtag, PencilSquare, DocumentText, Envelope } from '@steeze-ui/heroicons'

import AvatarStack from '../lib/AvatarStack.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

const meta = {
  title: 'Components/AvatarStack',
  component: AvatarStack as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any })]
} satisfies Meta<AvatarStack>

export default meta
type Story = StoryObj<typeof meta>

// Mock icon data using URLs
const mockIcons = [
  { name: 'Hashtag', url: 'https://api.iconify.design/mdi/pound.svg' },
  { name: 'Sign', url: 'https://api.iconify.design/mdi/pencil.svg' },
  { name: 'Invoice', url: 'https://api.iconify.design/mdi/file-document.svg' },
  { name: 'Slack', url: 'https://api.iconify.design/mdi/slack.svg' },
  { name: 'Email', url: 'https://api.iconify.design/mdi/email.svg' }
]

// Mock icon data using IconSource
const mockIconSources = [
  { name: 'Hashtag', icon: Hashtag },
  { name: 'Sign', icon: PencilSquare },
  { name: 'Invoice', icon: DocumentText },
  { name: 'Email', icon: Envelope }
]

export const TwoIcons: Story = {
  args: {
    icons: mockIcons.slice(0, 2)
  }
}

export const ThreeIcons: Story = {
  args: {
    icons: mockIcons.slice(0, 3)
  }
}

export const FiveIcons: Story = {
  args: {
    icons: mockIcons
  }
}

export const SixIcons: Story = {
  args: {
    icons: [
      ...mockIcons,
      { name: 'GitHub', url: 'https://api.iconify.design/mdi/github.svg' }
    ]
  }
}

export const SevenIconsWithOverflow: Story = {
  args: {
    icons: [
      ...mockIcons,
      { name: 'GitHub', url: 'https://api.iconify.design/mdi/github.svg' },
      { name: 'Twitter', url: 'https://api.iconify.design/mdi/twitter.svg' }
    ]
  }
}

export const TenIconsWithOverflow: Story = {
  args: {
    icons: [
      ...mockIcons,
      { name: 'GitHub', url: 'https://api.iconify.design/mdi/github.svg' },
      { name: 'Twitter', url: 'https://api.iconify.design/mdi/twitter.svg' },
      { name: 'LinkedIn', url: 'https://api.iconify.design/mdi/linkedin.svg' },
      { name: 'Facebook', url: 'https://api.iconify.design/mdi/facebook.svg' },
      { name: 'Instagram', url: 'https://api.iconify.design/mdi/instagram.svg' }
    ]
  }
}

export const Empty: Story = {
  args: {
    icons: []
  }
}

export const WithIconSource: Story = {
  args: {
    icons: mockIconSources
  }
}

export const WithIconSourceSmall: Story = {
  args: {
    icons: mockIconSources,
    size: 'sm'
  }
}

export const SmallSize: Story = {
  args: {
    icons: mockIcons,
    size: 'sm'
  }
}

export const SmallSizeWithOverflow: Story = {
  args: {
    icons: [
      ...mockIcons,
      { name: 'GitHub', url: 'https://api.iconify.design/mdi/github.svg' },
      { name: 'Twitter', url: 'https://api.iconify.design/mdi/twitter.svg' }
    ],
    size: 'sm'
  }
}
