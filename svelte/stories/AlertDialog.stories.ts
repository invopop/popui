import type { Meta, StoryObj } from '@storybook/svelte'

import AlertDialogComponent from './helpers/AlertDialogComponent.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialogComponent,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<AlertDialogComponent>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const WithSlot: Story = {
  args: {
    withSlot: true,
    title: 'Are you sure?',
    description: 'This action can be reverted later'
  }
}

export const WithTitle: Story = {
  args: {
    open: true,
    title: 'Are you sure?',
    description: 'This action can be reverted later'
  }
}

export const Destructive: Story = {
  args: {
    open: true,
    destructive: true,
    title: 'Are you sure?',
    description: 'This action can not be undone'
  }
}

export const WithoutTitle: Story = {
  args: {
    open: true,
    description:
      'Restoring V3 as draft will discard your current changes, are you sure you want to continue?'
  }
}
