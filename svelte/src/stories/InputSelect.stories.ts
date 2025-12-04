import type { Meta, StoryObj } from '@storybook/sveltekit'

import InputSelect from '../lib/InputSelect.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Cog6Tooth } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputSelect',
  component: InputSelect,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<InputSelect>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' }
]

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Placeholder: Story = {
  args: {
    placeholder: 'Select an option',
    options
  }
}

export const Selected: Story = {
  args: {
    value: 'active',
    placeholder: 'Select an option',
    options
  }
}

export const WithIcon: Story = {
  args: {
    placeholder: 'Select an option',
    options,
    icon: Cog6Tooth
  }
}

export const WithIconSelected: Story = {
  args: {
    value: 'active',
    placeholder: 'Select an option',
    options,
    icon: Cog6Tooth
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Status',
    placeholder: 'Select an option',
    options
  }
}

export const WithError: Story = {
  args: {
    value: 'draft',
    placeholder: 'Select an option',
    options,
    errorText: 'This field is required'
  }
}
