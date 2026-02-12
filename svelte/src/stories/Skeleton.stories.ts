import type { Meta, StoryObj } from '@storybook/sveltekit'

import Skeleton from '../lib/skeleton/skeleton.svelte'
import SkeletonAvatar from '../lib/skeleton/skeleton-avatar.svelte'
import SkeletonCard from '../lib/skeleton/skeleton-card.svelte'
import SkeletonList from '../lib/skeleton/skeleton-list.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any]
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    class: 'h-4 w-[250px]'
  }
}

export const Avatar: Story = {
  render: (args) => ({
    Component: SkeletonAvatar,
    props: args
  }),
  args: {
    size: 48
  }
}

export const Card: Story = {
  render: (args) => ({
    Component: SkeletonCard,
    props: args
  }),
  args: {
    avatarSize: 48,
    lines: 2,
    width: 250
  }
}

export const List: Story = {
  render: (args) => ({
    Component: SkeletonList,
    props: args
  }),
  args: {
    rows: 5,
    width: 250
  }
}
