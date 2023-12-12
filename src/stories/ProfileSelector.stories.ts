import type { Meta, StoryObj } from '@storybook/svelte'

import ProfileSelector from '../lib/ProfileSelector.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/ProfileSelector',
  component: ProfileSelector,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<ProfileSelector>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    name: 'Sam Lown'
  }
}

export const Collapsed: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsed: true,
    name: 'Sam Lown'
  }
}
