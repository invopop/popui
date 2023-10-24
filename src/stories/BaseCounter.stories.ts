import type { Meta, StoryObj } from '@storybook/svelte'

import BaseCounter from '../lib/BaseCounter.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseCounter',
  component: BaseCounter,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<BaseCounter>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const OneFigure: Story = {
  args: {
    content: 0
  }
}

export const TwoFigures: Story = {
  args: {
    content: 10
  }
}

export const ThreeFigures: Story = {
  args: {
    content: 980
  }
}
