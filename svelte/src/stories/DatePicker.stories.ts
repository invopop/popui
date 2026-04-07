import type { Meta, StoryObj } from '@storybook/sveltekit'

import DatePicker from '../lib/DatePicker.svelte'
import StackedDatePickers from './helpers/StackedDatePickers.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import ItemPushedToLeftDecorator from './decorartors/ItemPushedToLeftDecorator.svelte'
import ItemPushedToRightDecorator from './decorartors/ItemPushedToRightDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/DatePicker',
  component: DatePicker as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any })]
} satisfies Meta<DatePicker>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const LeftPosition: Story = {
  decorators: [() => ({ Component: ItemPushedToLeftDecorator as any })],
  args: {
    label: 'Pick a Date'
  }
}

export const RightPosition: Story = {
  decorators: [() => ({ Component: ItemPushedToRightDecorator as any })],
  args: {
    label: 'Pick a Date'
  }
}

export const WithSelectedDates: Story = {
  decorators: [() => ({ Component: ItemPushedToRightDecorator as any })],
  args: {
    from: '2022-12-10',
    to: '2022-12-12',
    label: 'Pick a Date'
  }
}

export const WithSelectedEmptyDates: Story = {
  decorators: [() => ({ Component: ItemPushedToRightDecorator as any })],
  args: {
    from: '',
    to: '',
    label: 'Pick a Date'
  }
}

export const Stacked: Story = {
  render: () => ({
    Component: StackedDatePickers as any
  })
}
