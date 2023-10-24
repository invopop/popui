import type { Meta, StoryObj } from '@storybook/svelte'

import TagStatus from '../lib/TagStatus.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/TagStatus',
  component: TagStatus,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<TagStatus>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    label: 'Tag'
  }
}

export const Success: Story = {
  args: {
    label: 'Tag',
    status: 'success'
  }
}

export const Warning: Story = {
  args: {
    label: 'Tag',
    status: 'warning'
  }
}

export const Danger: Story = {
  args: {
    label: 'Tag',
    status: 'danger'
  }
}

export const Orange: Story = {
  args: {
    label: 'Tag',
    status: 'orange'
  }
}
