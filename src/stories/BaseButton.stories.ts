import type { Meta, StoryObj } from '@storybook/svelte'

import BaseButton from './helpers/BaseButtonWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseButton',
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

export const DefaultSmall: Story = {
  args: {
    slot: 'Button',
    small: true
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

export const DefaultWithOnlyIcon: Story = {
  args: {
    icon: Cog6Tooth
  }
}

export const Primary: Story = {
  args: {
    slot: 'Primary Button',
    variant: 'primary'
  }
}

export const PrimaryWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    slot: 'Secondary Button',
    variant: 'secondary'
  }
}

export const SecondaryWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    variant: 'secondary'
  }
}

export const Danger: Story = {
  args: {
    slot: 'Danger Button',
    variant: 'danger'
  }
}

export const DangerWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    variant: 'danger'
  }
}

export const Dark: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    slot: 'Dark Button',
    variant: 'dark'
  }
}

export const DarkWithIcon: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    variant: 'dark'
  }
}
