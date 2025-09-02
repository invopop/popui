import type { Meta, StoryObj } from '@storybook/sveltekit'

import MenuItemCollapsible from './helpers/MenuItemCollapsibleWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import { Close } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/MenuItemCollapsible',
  component: MenuItemCollapsible,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<MenuItemCollapsible>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    title: 'Help'
  }
}

export const WithIcon: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    title: 'Help',
    icon: Close
  }
}

export const Collapsed: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    title: 'Help',
    collapsed: true
  }
}
