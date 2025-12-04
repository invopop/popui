import type { Meta, StoryObj } from '@storybook/sveltekit'

import InputToggle from '../lib/InputToggle.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputToggle',
  component: InputToggle,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<InputToggle>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Unchecked: Story = {}

export const Checked: Story = {
  args: {
    checked: true
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Label'
  }
}

export const WithLabelChecked: Story = {
  args: {
    label: 'Label',
    checked: true
  }
}
