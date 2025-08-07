import type { Meta, StoryObj } from '@storybook/svelte'

import Notification from '../lib/Notification.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/Notification',
  component: Notification,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<Notification>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Success: Story = {
  args: {
    type: 'success',
    message: 'Everything is fine'
  }
}

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Something went wrong'
  }
}

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Watch out for this'
  }
}
