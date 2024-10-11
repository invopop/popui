import type { Meta, StoryObj } from '@storybook/svelte'

import GlobalSearch from '../lib/GlobalSearch.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/GlobalSearch',
  component: GlobalSearch,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<GlobalSearch>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => DarkBackgroundDecorator]
}

export const Collapsed: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsed: true
  }
}
