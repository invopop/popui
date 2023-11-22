import type { Meta, StoryObj } from '@storybook/svelte'

import DatePicker from '../lib/DatePicker.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import ItemPushedToRightDecorator from './decorartors/ItemPushedToRightDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<DatePicker>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const LeftPosition: Story = {
  args: {
    label: 'Pick a Date'
  }
}

export const RightPosition: Story = {
  decorators: [() => ItemPushedToRightDecorator],

  args: {
    label: 'Pick a Date',
    position: 'right'
  }
}
