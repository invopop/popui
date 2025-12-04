import type { Meta, StoryObj } from '@storybook/sveltekit'

import InputTextarea from '../lib/InputTextarea.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputTextarea',
  component: InputTextarea,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<InputTextarea>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const WithoutLabel: Story = {
  args: {
    placeholder: 'Placeholder'
  }
}

export const WithLabel: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label'
  }
}

export const Disabled: Story = {
  args: {
    placeholder: 'Placeholder',
    disabled: true
  }
}

export const WithError: Story = {
  args: {
    value: 'Wrong Thing',
    placeholder: 'Placeholder',
    errorText: 'Error label'
  }
}
