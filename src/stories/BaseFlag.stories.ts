import type { Meta, StoryObj } from '@storybook/svelte'

import BaseFlag from '../lib/BaseFlag.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseFlag',
  component: BaseFlag,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<BaseFlag>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    country: 'es'
  }
}

export const Uppercased: Story = {
  args: {
    country: 'ES'
  }
}

export const DifferentWidth: Story = {
  args: {
    country: 'ES',
    width: 80
  }
}
