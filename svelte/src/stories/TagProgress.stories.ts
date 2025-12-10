import type { Meta, StoryObj } from '@storybook/svelte'
import TagProgress from '../lib/TagProgress.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'

const meta = {
  title: 'Components/TagProgress',
  component: TagProgress as any,
  tags: ['autodocs']
} satisfies Meta<TagProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default25: Story = {
  args: {
    progress: 0.25,
    variant: 'default'
  }
}

export const Default33: Story = {
  args: {
    progress: 0.33,
    variant: 'default'
  }
}

export const Default50: Story = {
  args: {
    progress: 0.5,
    variant: 'default'
  }
}

export const Default75: Story = {
  args: {
    progress: 0.75,
    variant: 'default'
  }
}

export const DefaultComplete: Story = {
  args: {
    progress: 1,
    variant: 'default'
  }
}

export const Dark25: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.25,
    variant: 'dark'
  }
}

export const Dark33: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.33,
    variant: 'dark'
  }
}

export const Dark50: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.5,
    variant: 'dark'
  }
}

export const Dark75: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.75,
    variant: 'dark'
  }
}

export const DarkComplete: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 1,
    variant: 'dark'
  }
}
