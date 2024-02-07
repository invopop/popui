import type { Meta, StoryObj } from '@storybook/svelte'

import ButtonFile from '../lib/ButtonFile.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Code } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/ButtonFile',
  component: ButtonFile,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<ButtonFile>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    name: 'File name'
  }
}

export const WithDifferentIcon: Story = {
  args: {
    icon: Code,
    name: 'File name'
  }
}

export const LongName: Story = {
  args: {
    name: 'File name that is very very long and does not fit at all'
  }
}

export const Disabled: Story = {
  args: {
    name: 'File name',
    disabled: true
  }
}
