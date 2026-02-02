import type { Meta, StoryObj } from '@storybook/sveltekit'

import InputSearch from '../lib/InputSearch.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import { Hashtag } from '@invopop/ui-icons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/InputSearch',
  component: InputSearch,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<InputSearch>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: 'Search'
  }
}

export const WithShortcut: Story = {
  args: {
    placeholder: 'Search',
    shortcut: '⌘F'
  }
}

export const WithSingleKeyShortcut: Story = {
  args: {
    placeholder: 'Search',
    shortcut: 'K'
  }
}

export const WithValue: Story = {
  args: {
    value: 'F2023-001',
    placeholder: 'Search',
    shortcut: '⌘F'
  }
}

export const WithDifferentIcon: Story = {
  args: {
    placeholder: 'Search',
    icon: Hashtag,
    shortcut: '⌘F'
  }
}

export const Loading: Story = {
  args: {
    placeholder: 'Search',
    loading: true
  }
}

export const LoadingWithShortcut: Story = {
  args: {
    placeholder: 'Search',
    shortcut: '⌘F',
    loading: true
  }
}

export const LoadingWithValue: Story = {
  args: {
    value: 'Searching...',
    placeholder: 'Search',
    shortcut: '⌘F',
    loading: true
  }
}
