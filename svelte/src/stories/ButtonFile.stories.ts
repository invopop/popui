import type { Meta, StoryObj } from '@storybook/sveltekit'

import ButtonFile from '../lib/ButtonFile.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

const meta = {
  title: 'Components/ButtonFile',
  component: ButtonFile,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<ButtonFile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'File name',
    fileType: 'pdf'
  }
}

export const WithDate: Story = {
  args: {
    name: 'File name',
    date: 'Mar 06, 2024 · 09:48',
    fileType: 'pdf'
  }
}

export const XMLFile: Story = {
  args: {
    name: 'File name',
    fileType: 'xml'
  }
}

export const PNGFile: Story = {
  args: {
    name: 'Image',
    fileType: 'png'
  }
}

export const GenericFile: Story = {
  args: {
    name: 'Document.txt',
    date: 'Mar 06, 2024 · 09:48',
    fileType: 'generic'
  }
}

export const LongName: Story = {
  args: {
    name: 'File name that is very very long and does not fit at all',
    fileType: 'pdf'
  }
}

export const Disabled: Story = {
  args: {
    name: 'File name',
    disabled: true,
    fileType: 'pdf'
  }
}

