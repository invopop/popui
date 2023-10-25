import type { Meta, StoryObj } from '@storybook/svelte'

import DrawerContext from '../lib/DrawerContext.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/DrawerContext',
  component: DrawerContext,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<DrawerContext>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const SingleSelect: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee' },
      { label: 'Payflow S.L.', value: 'payflow' }
    ]
  }
}

export const WithFooter: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee' },
      { label: 'Payflow S.L.', value: 'payflow' },
      { label: 'Footer S.L.', value: 'footer', footer: true }
    ]
  }
}

export const MultipleSelect: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee' },
      { label: 'Payflow S.L.', value: 'payflow' }
    ],
    multiple: true
  }
}

export const Searchable: Story = {
  args: {
    items: [
      { label: 'Cobee S.L.', value: 'cobee' },
      { label: 'Payflow S.L.', value: 'payflow' }
    ],
    multiple: true,
    searchable: true
  }
}
