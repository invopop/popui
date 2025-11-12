import type { Meta, StoryObj } from '@storybook/sveltekit'

import BaseButton from './helpers/BaseButtonWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import { Close, Add } from '@invopop/ui-icons'

const meta = {
  title: 'Components/BaseButton',
  component: BaseButton as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any]
} satisfies Meta<BaseButton>

export default meta
type Story = StoryObj<typeof meta>

// Primary Variant
export const Primary: Story = {
  args: {
    slot: 'Primary Button',
    variant: 'primary'
  }
}

export const PrimaryWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Add,
    variant: 'primary'
  }
}

export const PrimaryIconOnly: Story = {
  args: {
    icon: Add,
    variant: 'primary'
  }
}

export const PrimaryDisabled: Story = {
  args: {
    slot: 'Button',
    variant: 'primary',
    disabled: true
  }
}

// Danger Variant
export const Danger: Story = {
  args: {
    slot: 'Danger Button',
    variant: 'danger'
  }
}

export const DangerWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Close,
    variant: 'danger'
  }
}

export const DangerIconOnly: Story = {
  args: {
    icon: Close,
    variant: 'danger'
  }
}

// Outline Variant
export const Outline: Story = {
  args: {
    slot: 'Outline Button',
    variant: 'outline'
  }
}

export const OutlineWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    variant: 'outline'
  }
}

export const OutlineIconOnly: Story = {
  args: {
    icon: Cog6Tooth,
    variant: 'outline'
  }
}

// Ghost Variant  
export const Ghost: Story = {
  args: {
    slot: 'Ghost Button',
    variant: 'ghost'
  }
}

export const GhostWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    variant: 'ghost'
  }
}

// Default Variant
export const Default: Story = {
  args: {
    slot: 'Default Button'
  }
}

export const DefaultWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth
  }
}

// Secondary Variant
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

export const SecondaryIconOnly: Story = {
  args: {
    icon: Cog6Tooth,
    variant: 'secondary'
  }
}

// Dark Variant (Navigation)
export const Dark: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    slot: 'Dark Button',
    variant: 'dark'
  }
}

export const DarkWithIcon: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    variant: 'dark'
  }
}

export const DarkIconOnly: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    icon: Cog6Tooth,
    variant: 'dark'
  }
}

// Sizes
export const SmallSize: Story = {
  args: {
    slot: 'Button',
    variant: 'primary',
    size: 'sm'
  }
}

export const SmallWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Add,
    variant: 'primary',
    size: 'sm'
  }
}

export const SmallIconOnly: Story = {
  args: {
    icon: Add,
    variant: 'primary',
    size: 'sm'
  }
}

export const BigSize: Story = {
  args: {
    slot: 'Button',
    variant: 'primary',
    size: 'lg'
  }
}

export const BigWithIcon: Story = {
  args: {
    slot: 'Button',
    icon: Add,
    variant: 'primary',
    size: 'lg'
  }
}

export const BigIconOnly: Story = {
  args: {
    icon: Add,
    variant: 'primary',
    size: 'lg'
  }
}

// Icon Position
export const IconRight: Story = {
  args: {
    slot: 'Button',
    icon: Cog6Tooth,
    iconPosition: 'right',
    variant: 'primary'
  }
}

// Fullwidth
export const Fullwidth: Story = {
  decorators: [() => MaxWidthSmDecorator as any],
  args: {
    slot: 'Full Width Button',
    variant: 'primary',
    fullwidth: true
  }
}

// Danger Icon styling
export const WithDangerIcon: Story = {
  args: {
    slot: 'Delete',
    icon: Close,
    variant: 'outline',
    dangerIcon: true
  }
}
