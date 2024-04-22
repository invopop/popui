import type { Meta, StoryObj } from '@storybook/svelte'

import MenuItemWithChildren from './MenuItemWithChildren.svelte'
import MarginDecorator from '../decorartors/MarginDecorator.svelte'
import DarkBackgroundDecorator from '../decorartors/DarkBackgroundDecorator.svelte'
import { DocumentText } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Examples/Menu Item With Children',
  component: MenuItemWithChildren,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<MenuItemWithChildren>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const CollapsableClosed: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsable: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const CollapsableOpen: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsable: true,
    open: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const ParentActive: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsable: true,
    open: true,
    active: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item' }]
  }
}

export const ChildActive: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    collapsable: true,
    open: true,
    children: [{ label: 'Child Item' }, { label: 'Another Child Item', active: true }]
  }
}

export const CollapsedSidebarWithChild: Story = {
  args: {
    icon: DocumentText,
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
  decorators: [() => DarkBackgroundDecorator],
  args: {
    icon: DocumentText,
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
