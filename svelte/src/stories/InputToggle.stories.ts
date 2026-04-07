import type { Meta, StoryObj } from '@storybook/sveltekit'

import InputToggle from '../lib/InputToggle.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputToggle',
  component: InputToggle as any,
  tags: ['autodocs'],
  decorators: [() => ({ Component: MarginDecorator as any }), () => ({ Component: MaxWidthSmDecorator as any })]
} satisfies Meta<InputToggle>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Unchecked: Story = {}

export const Checked: Story = {
  args: {
    checked: true
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Label'
  }
}

export const WithLabelChecked: Story = {
  args: {
    label: 'Label',
    checked: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true
  }
}

export const DisabledWithLabel: Story = {
  args: {
    disabled: true,
    label: 'Disabled Label'
  }
}

export const DisabledWithLabelChecked: Story = {
  args: {
    disabled: true,
    label: 'Disabled Label',
    checked: true
  }
}

export const DisabledWithHint: Story = {
  args: {
    disabled: true,
    hint: 'This option cannot be changed'
  }
}

export const DisabledWithLabelAndHint: Story = {
  args: {
    disabled: true,
    label: 'Disabled with hint',
    checked: true,
    hint: 'This option is locked and cannot be modified'
  }
}
