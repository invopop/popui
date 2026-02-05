import type { Meta, StoryObj } from '@storybook/sveltekit'

import ButtonSearch from '../lib/ButtonSearch.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

const meta = {
  title: 'Components/ButtonSearch',
  component: ButtonSearch,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator]
} satisfies Meta<ButtonSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Search...'
  }
}

export const Expanded: Story = {
  args: {
    expanded: true,
    placeholder: 'Search...'
  }
}

export const WithValue: Story = {
  args: {
    value: 'test query',
    expanded: true,
    placeholder: 'Search...'
  }
}

export const Loading: Story = {
  args: {
    value: 'loading search',
    expanded: true,
    placeholder: 'Search...',
    loading: true
  }
}

export const LoadingCollapsed: Story = {
  args: {
    placeholder: 'Search...',
    loading: true
  }
}
