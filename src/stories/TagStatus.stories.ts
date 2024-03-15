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
    status: 'green'
  }
}

export const Warning: Story = {
  args: {
    label: 'Tag',
    status: 'yellow'
  }
}

export const Danger: Story = {
  args: {
    label: 'Tag',
    status: 'red'
  }
}

export const Orange: Story = {
  args: {
    label: 'Tag',
    status: 'orange'
  }
}

export const Info: Story = {
  args: {
    label: 'Tag',
    status: 'blue'
  }
}

export const Purple: Story = {
  args: {
    label: 'Tag',
    status: 'purple'
  }
}

export const Empty: Story = {
  args: {
    label: 'Tag',
    status: 'empty'
  }
}

export const WithDot: Story = {
  args: {
    label: 'Tag',
    status: 'empty',
    dot: true
  }
}
