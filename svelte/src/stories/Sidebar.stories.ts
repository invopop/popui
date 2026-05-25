import type { Meta, StoryObj } from '@storybook/sveltekit'

import SidebarComponent from './helpers/SidebarComponent.svelte'

const meta = {
  title: 'Components/Sidebar',
  component: SidebarComponent as any,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'inline-radio', options: ['left', 'right'] },
    variant: { control: 'inline-radio', options: ['sidebar', 'floating', 'inset'] },
    collapsible: { control: 'inline-radio', options: ['offcanvas', 'icon', 'none'] },
    defaultOpen: { control: 'boolean' }
  },
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<SidebarComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
    defaultOpen: true
  }
}

export const Floating: Story = {
  args: {
    side: 'left',
    variant: 'floating',
    collapsible: 'icon',
    defaultOpen: true
  }
}

export const Inset: Story = {
  args: {
    side: 'left',
    variant: 'inset',
    collapsible: 'icon',
    defaultOpen: true
  }
}

export const Offcanvas: Story = {
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
    defaultOpen: true
  }
}

export const CollapsedAtStart: Story = {
  args: {
    side: 'left',
    variant: 'floating',
    collapsible: 'icon',
    defaultOpen: false
  }
}

export const RightSide: Story = {
  args: {
    side: 'right',
    variant: 'sidebar',
    collapsible: 'icon',
    defaultOpen: true
  }
}
