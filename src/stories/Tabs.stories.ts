import type { Meta, StoryObj } from '@storybook/svelte'

import Tabs from '../lib/Tabs.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthMdDecorator]
} satisfies Meta<Tabs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    items: [
      { label: 'Tab 1', slug: 'tab-1' },
      { label: 'Tab 2', slug: 'tab-2' },
      { label: 'Tab 3', slug: 'tab-3' },
      { label: 'Tab 4', slug: 'tab-4' },
      { label: 'Tab 5', slug: 'tab-5' }
    ]
  }
}

export const SelectedTab: Story = {
  args: {
    items: [
      { label: 'Tab 1', slug: 'tab-1' },
      { label: 'Tab 2', slug: 'tab-2' },
      { label: 'Tab 3', slug: 'tab-3' }
    ],
    selected: 'tab-2'
  }
}

export const WithCounter: Story = {
  args: {
    items: [
      { label: 'Tab 1', slug: 'tab-1' },
      { label: 'Tab 2', slug: 'tab-2', counter: 3 },
      { label: 'Tab 3', slug: 'tab-3' },
      { label: 'Tab 4', slug: 'tab-4' },
      { label: 'Tab 5', slug: 'tab-5' }
    ],
    selected: 'tab-4'
  }
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Tab 1', slug: 'tab-1' },
      { label: 'Tab 2', slug: 'tab-2', check: true },
      { label: 'Tab 3', slug: 'tab-3' },
      { label: 'Tab 4', slug: 'tab-4', warning: true },
      { label: 'Tab 5', slug: 'tab-5' }
    ],
    selected: 'tab-3'
  }
}
