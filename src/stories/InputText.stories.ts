import type { Meta, StoryObj } from '@storybook/svelte'

import InputText from '../lib/InputText.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputText',
  component: InputText,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<InputText>

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

export const Autofocus: Story = {
  args: {
    value: '',
    placeholder: 'Placeholder',
    focusOnLoad: true
  }
}
