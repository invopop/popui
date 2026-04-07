import type { Meta, StoryObj } from '@storybook/sveltekit'

import SeparatorHorizontal from '../lib/SeparatorHorizontal.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/SeparatorHorizontal',
  component: SeparatorHorizontal as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any })]
} satisfies Meta<SeparatorHorizontal>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {}
