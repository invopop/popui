import type { Meta, StoryObj } from '@storybook/svelte'

import CardRelation from '../lib/CardRelation.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Invoice } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/CardRelation',
  component: CardRelation,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<CardRelation>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    title: 'FC2023-102',
    icon: Invoice,
    items: [
      {
        label: 'Type',
        value: 'Credit Note'
      },
      {
        label: 'Created at',
        value: 'Mar 06, 2024 · 09:48'
      },
      {
        label: 'Total',
        value: '2,803.94 EUR'
      }
    ]
  }
}
