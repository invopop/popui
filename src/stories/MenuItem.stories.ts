import type { Meta, StoryObj } from '@storybook/svelte'

import MenuItem from '../lib/MenuItem.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<MenuItem>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    label: 'Item'
  }
}

export const WithIcon: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    label: 'Item',
    icon: Cog6Tooth
  }
}

export const WithIconAsText: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    label: 'Item',
    icon: 'document-text'
  }
}

export const FolderItem: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    label: 'Folder Item',
    isFolderItem: true
  }
}

export const FolderItemWithIcon: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    label: 'Folder Item',
    isFolderItem: true,
    icon: Cog6Tooth
  }
}

export const CollapsableClosed: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    label: 'Folder Item',
    collapsable: true
  }
}

export const CollapsableOpen: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    label: 'Folder Item',
    collapsable: true,
    open: true
  }
}
