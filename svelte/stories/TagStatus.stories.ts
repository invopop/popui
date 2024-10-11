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

export const DefaultWithDot: Story = {
  args: {
    label: 'Tag',
    dot: true
  }
}

export const Green: Story = {
  args: {
    label: 'Tag',
    status: 'green'
  }
}

export const GreenWithDot: Story = {
  args: {
    label: 'Tag',
    status: 'green',
    dot: true
  }
}

export const Yellow: Story = {
  args: {
    label: 'Tag',
    status: 'yellow'
  }
}

export const YellowWithDot: Story = {
  args: {
    label: 'Tag',
    status: 'yellow',
    dot: true
  }
}

export const Red: Story = {
  args: {
    label: 'Tag',
    status: 'red'
  }
}

export const RedWithDot: Story = {
  args: {
    label: 'Tag',
    status: 'red',
    dot: true
  }
}

export const Orange: Story = {
  args: {
    label: 'Tag',
    status: 'orange'
  }
}

export const OrangeWithDot: Story = {
  args: {
    label: 'Tag',
    status: 'orange',
    dot: true
  }
}

export const Blue: Story = {
  args: {
    label: 'Tag',
    status: 'blue'
  }
}

export const BlueWithDot: Story = {
  args: {
    label: 'Tag',
    status: 'blue',
    dot: true
  }
}

export const Purple: Story = {
  args: {
    label: 'Tag',
    status: 'purple'
  }
}

export const PurpleWithDot: Story = {
  args: {
    label: 'Tag',
    status: 'purple',
    dot: true
  }
}

export const Empty: Story = {
  args: {
    label: 'Tag',
    status: 'empty'
  }
}

export const EmptyWithDot: Story = {
  args: {
    label: 'Tag',
    status: 'empty',
    dot: true
  }
}
