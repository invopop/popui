import type { Meta, StoryObj } from '@storybook/svelte'

import DatePicker from '../lib/DatePicker.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import ItemPushedToLeftDecorator from './decorartors/ItemPushedToLeftDecorator.svelte'
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
  decorators: [() => ItemPushedToLeftDecorator],
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

export const WithSelectedDates: Story = {
  decorators: [() => ItemPushedToRightDecorator],
  args: {
    from: '2022-12-10',
    to: '2022-12-12',
    label: 'Pick a Date',
    position: 'right'
  }
}

export const WithSelectedEmptyDates: Story = {
  decorators: [() => ItemPushedToRightDecorator],
  args: {
    from: '',
    to: '',
    label: 'Pick a Date',
    position: 'right'
  }
}
