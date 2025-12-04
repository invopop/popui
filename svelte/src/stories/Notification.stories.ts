import type { Meta, StoryObj } from '@storybook/sveltekit'

import Notification from '../lib/Notification.svelte'
import NotificationWithButton from './helpers/NotificationWithButton.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/Notification',
  component: Notification,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any]
} satisfies Meta<Notification>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const NeutralWithDescription: Story = {
  args: {
    type: 'neutral',
    title: 'Title',
    description: 'Description'
  }
}

export const NeutralWithoutDescription: Story = {
  args: {
    type: 'neutral',
    title: 'Title'
  }
}

export const InformativeWithDescription: Story = {
  args: {
    type: 'info',
    title: 'Title',
    description: 'Description'
  }
}

export const InformativeWithoutDescription: Story = {
  args: {
    type: 'info',
    title: 'Title'
  }
}

export const SuccessWithDescription: Story = {
  args: {
    type: 'success',
    title: 'Title',
    description: 'Description'
  }
}

export const SuccessWithoutDescription: Story = {
  args: {
    type: 'success',
    title: 'Title'
  }
}

export const WarningWithDescription: Story = {
  args: {
    type: 'warning',
    title: 'Title',
    description: 'Description'
  }
}

export const WarningWithoutDescription: Story = {
  args: {
    type: 'warning',
    title: 'Title'
  }
}

export const CriticalWithDescription: Story = {
  args: {
    type: 'error',
    title: 'Title',
    description: 'Description'
  }
}

export const CriticalWithoutDescription: Story = {
  args: {
    type: 'error',
    title: 'Title'
  }
}

export const WithButton: Story = {
  render: () => ({
    Component: NotificationWithButton,
    props: {
      type: 'info',
      title: 'Title',
      description: 'Description'
    }
  })
}

export const WithButtonNoDescription: Story = {
  render: () => ({
    Component: NotificationWithButton,
    props: {
      type: 'warning',
      title: 'Title'
    }
  })
}
