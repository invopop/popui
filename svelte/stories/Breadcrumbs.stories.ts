import type { Meta, StoryObj } from '@storybook/svelte'

import Breadcrumbs from '../lib/Breadcrumbs.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthMdDecorator]
} satisfies Meta<Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'Not clickable' },
      { label: 'Clickable', url: '#something' },
      { label: 'Last' }
    ]
  }
}
