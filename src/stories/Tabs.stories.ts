import type { Meta, StoryObj } from '@storybook/svelte'

import Tabs from '../lib/Tabs.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<Tabs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']
  }
}

export const SelectedTab: Story = {
  args: {
    items: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'],
    selected: 'Tab 2'
  }
}
