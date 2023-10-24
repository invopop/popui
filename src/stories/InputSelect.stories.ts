import type { Meta, StoryObj } from '@storybook/svelte'

import InputSelect from '../lib/InputSelect.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputSelect',
  component: InputSelect,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<InputSelect>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const WithLabel: Story = {
  args: {
    label: 'Label'
  }
}

export const WithoutLabel: Story = {}

export const WithNoSelectablePlaceholder: Story = {
  args: {
    placeholder: 'This is a placeholder...',
    options: [
      { value: 1, label: 'Option one' },
      { value: 2, label: 'Option Two' }
    ]
  }
}

export const WithSelectablePlaceholder: Story = {
  args: {
    placeholder: 'All options',
    disablePlaceholder: false,
    options: [
      { value: 1, label: 'Option one' },
      { value: 2, label: 'Option Two' }
    ]
  }
}

export const WithIcon: Story = {
  args: {
    placeholder: 'All options',
    disablePlaceholder: false,
    options: [
      { value: 1, label: 'Option one' },
      { value: 2, label: 'Option Two' }
    ],
    icon: Cog6Tooth
  }
}
