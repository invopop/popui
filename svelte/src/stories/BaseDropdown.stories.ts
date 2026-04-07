import type { Meta, StoryObj } from '@storybook/sveltekit'

import BaseDropdownWithSlot from './helpers/BaseDropdownWithSlot.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseDropdown',
  component: BaseDropdownWithSlot as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any }), () => ({ Component: MaxWidthSmDecorator as any })]
} satisfies Meta<BaseDropdownWithSlot>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {}
