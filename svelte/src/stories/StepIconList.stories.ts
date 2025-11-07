import type { Meta, StoryObj } from '@storybook/sveltekit'

import StepIconList from '../lib/StepIconList.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/StepIconList',
  component: StepIconList,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any]
} satisfies Meta<StepIconList>

export default meta
type Story = StoryObj<typeof meta>

// Mock icon data
const mockIcons = [
  { name: 'Hashtag', url: 'https://api.iconify.design/mdi/pound.svg' },
  { name: 'Sign', url: 'https://api.iconify.design/mdi/pencil.svg' },
  { name: 'Invoice', url: 'https://api.iconify.design/mdi/file-document.svg' },
  { name: 'Slack', url: 'https://api.iconify.design/mdi/slack.svg' },
  { name: 'Email', url: 'https://api.iconify.design/mdi/email.svg' }
]

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
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
