import type { Meta, StoryObj } from '@storybook/svelte'

import InputCheckbox from '../lib/InputCheckbox.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputCheckbox',
  component: InputCheckbox,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<InputCheckbox>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Unckecked: Story = {}

export const Checked: Story = {
  args: {
    checked: true
  }
}
