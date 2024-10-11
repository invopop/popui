import type { Meta, StoryObj } from '@storybook/svelte'

import SeparatorHorizontal from '../lib/SeparatorHorizontal.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/SeparatorHorizontal',
  component: SeparatorHorizontal,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<SeparatorHorizontal>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {}
