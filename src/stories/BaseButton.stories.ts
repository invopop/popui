import type { Meta, StoryObj } from '@storybook/svelte'

import BaseButton from './helpers/BaseButtonWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Example/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<BaseButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    slot: 'Button'
  }
}

export const DefaultDisabled: Story = {
  args: {
    slot: 'Button',
    disabled: true
  }
}

export const DefaultWithLeftIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth
  }
}

export const DefaultWithRightIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    iconPosition: 'right'
  }
}

export const Primary: Story = {
  args: {
    slot: 'Primary Button',
    type: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    slot: 'Secondary Button',
    type: 'secondary'
  }
}

export const Danger: Story = {
  args: {
    slot: 'Danger Button',
    type: 'danger'
  }
}
