import type { Meta, StoryObj } from '@storybook/sveltekit'

import StatusLabel from '../lib/StatusLabel.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/StatusLabel',
  component: StatusLabel,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<StatusLabel>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Success: Story = {
  args: {
    label: 'OK',
    status: 'success'
  }
}

export const Failure: Story = {
  args: {
    label: 'KO',
    status: 'failure'
  }
}

export const Alert: Story = {
  args: {
    label: 'Error',
    status: 'alert'
  }
}

export const Queued: Story = {
  args: {
    label: 'Queued',
    status: 'queued'
  }
}

export const Run: Story = {
  args: {
    label: 'Running',
    status: 'run'
  }
}
