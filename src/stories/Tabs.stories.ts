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
      { label: 'Tab 1' },
      { label: 'Tab 2' },
      { label: 'Tab 3' },
      { label: 'Tab 4' },
      { label: 'Tab 5' }
    ]
  }
}

export const SelectedTab: Story = {
  args: {
    items: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
    selected: 'Tab 2'
  }
}

export const WithCounter: Story = {
  args: {
    items: [
      { label: 'Tab 1' },
      { label: 'Tab 2', counter: 3 },
      { label: 'Tab 3' },
      { label: 'Tab 4' },
      { label: 'Tab 5' }
    ],
    selected: 'Tab 3'
  }
}
