import type { Meta, StoryObj } from '@storybook/svelte'

import CardCheckbox from '../lib/CardCheckbox.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/CardCheckbox',
  component: CardCheckbox,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<CardCheckbox>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Unchecked: Story = {
  args: {
    title: 'Production',
    description: 'A live workspace which produces valid invoices'
  }
}
export const Checked: Story = {
  args: {
    title: 'Production',
    description: 'A live workspace which produces valid invoices',
    checked: true
  }
}
