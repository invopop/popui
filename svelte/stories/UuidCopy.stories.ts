import type { Meta, StoryObj } from '@storybook/svelte'

import UuidCopy from '../lib/UuidCopy.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/UuidCopy',
  component: UuidCopy,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<UuidCopy>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    uuid: 'e73d5d2083493458812'
  }
}

export const Dark: Story = {
  args: {
    uuid: 'e73d5d2083493458812',
    dark: true
  }
}

export const Small: Story = {
  args: {
    uuid: 'e73d5d2083493458812',
    small: true
  }
}

export const Shortened: Story = {
  args: {
    uuid: 'e73d5d20834934588127389172381789bc2f275460'
  }
}

export const ShortenedWithLessCharacters: Story = {
  args: {
    uuid: 'e73d5d20834934588127389172381789bc2f275460',
    prefixLength: 4,
    suffixLength: 4
  }
}

export const WithLink: Story = {
  args: {
    uuid: 'e73d5d2083493458812',
    link: true
  }
}
