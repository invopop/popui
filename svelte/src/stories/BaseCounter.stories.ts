import type { Meta, StoryObj } from '@storybook/sveltekit'

import BaseCounter from '../lib/BaseCounter.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

const meta = {
  title: 'Components/BaseCounter',
  component: BaseCounter as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<BaseCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    value: 1,
    theme: 'light'
  }
}

export const Accent: Story = {
  args: {
    value: 5,
    theme: 'accent'
  }
}

export const Navigation: Story = {
  args: {
    value: 3,
    theme: 'navigation'
  },
  decorators: [() => DarkBackgroundDecorator as any]
}

export const SingleDigit: Story = {
  args: {
    value: 2
  }
}

export const DoubleDigit: Story = {
  args: {
    value: 42
  }
}

export const TripleDigit: Story = {
  args: {
    value: 123
  }
}

