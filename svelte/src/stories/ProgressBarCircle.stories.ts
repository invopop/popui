import type { Meta, StoryObj } from '@storybook/svelte'
import ProgressBarCircle from '../lib/ProgressBarCircle.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'

const meta = {
  title: 'Components/ProgressBarCircle',
  component: ProgressBarCircle as any,
  tags: ['autodocs']
} satisfies Meta<ProgressBarCircle>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultSmall25: Story = {
  args: {
    progress: 0.25,
    size: 48,
    variant: 'default'
  }
}

export const DefaultSmall50: Story = {
  args: {
    progress: 0.5,
    size: 48,
    variant: 'default'
  }
}

export const DefaultSmall75: Story = {
  args: {
    progress: 0.75,
    size: 48,
    variant: 'default'
  }
}

export const DefaultSmallComplete: Story = {
  args: {
    progress: 1,
    size: 48,
    variant: 'default'
  }
}

export const DefaultMedium50: Story = {
  args: {
    progress: 0.5,
    size: 64,
    variant: 'default'
  }
}

export const DefaultLarge50: Story = {
  args: {
    progress: 0.5,
    size: 96,
    variant: 'default'
  }
}

export const DarkSmall25: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.25,
    size: 48,
    variant: 'dark'
  }
}

export const DarkSmall50: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.5,
    size: 48,
    variant: 'dark'
  }
}

export const DarkSmall75: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.75,
    size: 48,
    variant: 'dark'
  }
}

export const DarkSmallComplete: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 1,
    size: 48,
    variant: 'dark'
  }
}

export const DarkMedium50: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.5,
    size: 64,
    variant: 'dark'
  }
}

export const DarkLarge50: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    progress: 0.5,
    size: 96,
    variant: 'dark'
  }
}
