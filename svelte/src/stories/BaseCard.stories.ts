import type { Meta, StoryObj } from '@storybook/sveltekit'

import BaseCard from '../lib/BaseCard.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/BaseCard',
  component: BaseCard,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<BaseCard>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/16',
    imageAlt: 'Best pic ever',
    title: 'Amazing Stuff',
    description: 'This is incredible, trust me.'
  }
}

export const Enabled: Story = {
  args: {
    imageUrl: 'https://picsum.photos/16',
    imageAlt: 'Best pic ever',
    title: 'Amazing Stuff',
    description: 'This is incredible, trust me.',
    enabled: true
  }
}

export const Beta: Story = {
  args: {
    imageUrl: 'https://picsum.photos/16',
    imageAlt: 'Best pic ever',
    title: 'Amazing Stuff',
    description: 'This is incredible, trust me.',
    type: 'beta'
  }
}

export const EnabledBeta: Story = {
  args: {
    imageUrl: 'https://picsum.photos/16',
    imageAlt: 'Best pic ever',
    title: 'Amazing Stuff',
    description: 'This is incredible, trust me.',
    type: 'beta',
    enabled: true
  }
}

export const Soon: Story = {
  args: {
    imageUrl: 'https://picsum.photos/16',
    imageAlt: 'Best pic ever',
    title: 'Amazing Stuff',
    description: 'This is incredible, trust me.',
    type: 'soon'
  }
}
