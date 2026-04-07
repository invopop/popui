import type { Meta, StoryObj } from '@storybook/sveltekit'

import MenuItemWithChildren from './MenuItemWithChildren.svelte'
import MarginDecorator from '../decorartors/MarginDecorator.svelte'
import DarkBackgroundDecorator from '../decorartors/DarkBackgroundDecorator.svelte'
import { Invoice } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Examples/Menu Item With Children',
  component: MenuItemWithChildren as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any })]
} satisfies Meta<MenuItemWithChildren>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const CollapsableClosed: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    collapsable: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const CollapsableOpen: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    collapsable: true,
    open: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const ParentActive: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    collapsable: true,
    open: true,
    active: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const ChildActive: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    collapsable: true,
    open: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item', active: true }]
  }
}

export const CollapsedSidebarWithChild: Story = {
  args: {
    icon: Invoice,
    collapsedSidebar: true,
    collapsable: true,
    open: true,
    url: 'parent-item',
    children: [
      { label: 'Child Item', url: 'child-item' },
      { label: 'Another Child Item', url: 'another-child-item', active: true }
    ]
  }
}

export const CollapsedSidebarParentSelected: Story = {
  decorators: [() => ({ Component: DarkBackgroundDecorator as any })],
  args: {
    icon: Invoice,
    collapsedSidebar: true,
    collapsable: true,
    open: true,
    url: 'parent-item',
    active: true,
    children: [
      { label: 'Child Item', url: 'child-item' },
      { label: 'Another Child Item', url: 'another-child-item' }
    ]
  }
}
