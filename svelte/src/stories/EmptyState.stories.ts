import type { Meta, StoryObj } from '@storybook/sveltekit'

import EmptyStateWithIcon from './helpers/EmptyStateWithIcon.svelte'
import EmptyStateWithAction from './helpers/EmptyStateWithAction.svelte'
import { Hashtag } from '@invopop/ui-icons'

const meta = {
  title: 'Components/EmptyState',
  component: EmptyStateWithIcon as any,
  tags: ['autodocs']
} satisfies Meta<typeof EmptyStateWithIcon>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutIcon: Story = {
  args: {
    title: 'No files yet',
    description: 'Run a workflow to generate a file'
  }
}

export const WithIconSource: Story = {
  args: {
    iconSource: Hashtag,
    title: 'No files yet',
    description: 'Run a workflow to generate a file'
  }
}

export const WithCheck: Story = {
  args: {
    iconSource: Hashtag,
    title: 'No files yet',
    description: 'Run a workflow to generate a file',
    check: true
  }
}

export const WithIconSnippet: Story = {
  args: {
    customIcon: true,
    title: 'No files yet',
    description: 'Run a workflow to generate a file'
  }
}

export const WithAction: StoryObj<typeof EmptyStateWithAction> = {
  render: (args) => ({
    Component: EmptyStateWithAction,
    props: args
  }),
  args: {
    title: 'No files yet',
    description: 'Run a workflow to generate a file'
  }
}
