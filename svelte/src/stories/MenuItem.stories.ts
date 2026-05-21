import type { Meta, StoryObj } from '@storybook/sveltekit'

import MenuItem from '../lib/MenuItem.svelte'
import MenuItemWithAction from './helpers/MenuItemWithAction.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import MaxWidthXsDecorator from './decorartors/MaxWidthXsDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/MenuItem',
  component: MenuItem as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any }), () => ({ Component: MaxWidthSmDecorator as any })]
} satisfies Meta<MenuItem>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Item',
    beta: true
  }
}

export const WithIcon: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Item',
    icon: Cog6Tooth
  }
}

export const WithIconAsText: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Item',
    icon: 'invoice'
  }
}

export const FolderItem: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Folder Item',
    isFolderItem: true
  }
}

export const FolderItemWithIcon: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Folder Item',
    isFolderItem: true,
    icon: Cog6Tooth
  }
}

export const FolderItemSelected: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Folder Item',
    isFolderItem: true,
    active: true
  }
}

export const CollapsableClosed: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Folder Item',
    collapsable: true
  }
}

export const CollapsableOpen: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Folder Item',
    collapsable: true,
    open: true
  }
}

export const WithImage: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Acme Invoicing',
    imageUrl: 'https://www.google.com/s2/favicons?domain=invopop.com&sz=32'
  }
}

export const WithAction: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  render: (args) => ({ Component: MenuItemWithAction as any, props: args }),
  args: {
    label: 'Item with action',
    icon: Cog6Tooth
  }
}

export const CollapsableWithImageAndAction: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  render: (args) => ({ Component: MenuItemWithAction as any, props: args }),
  args: {
    label: 'Peppol',
    imageUrl: 'https://www.google.com/s2/favicons?domain=peppol.org&sz=32',
    collapsable: true,
    open: true
  }
}

export const Truncating: Story = {
  decorators: [
    () => ({ Component: DarkBackgroundDecorator as any }),
    () => ({ Component: MaxWidthXsDecorator as any })
  ],
  args: {
    label: 'A very long menu item label that should truncate when the container is narrow',
    icon: Cog6Tooth
  }
}

export const CustomClass: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    label: 'Custom class targeting label',
    icon: Cog6Tooth,
    class: '[&_[data-menu-item-label]]:italic [&_[data-menu-item-label]]:tracking-wider'
  }
}
