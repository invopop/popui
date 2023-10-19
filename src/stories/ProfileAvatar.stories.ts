import type { Meta, StoryObj } from '@storybook/svelte'

import ProfileAvatar from '../lib/ProfileAvatar.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Example/ProfileAvatar',
  component: ProfileAvatar,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator, () => MaxWidthSmDecorator]
} satisfies Meta<ProfileAvatar>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const NoPicture: Story = {
  args: {
    name: 'Brad Pitt'
  }
}

export const NoPictureLarge: Story = {
  args: {
    name: 'Brad Pitt',
    large: true
  }
}

export const WithPicture: Story = {
  args: {
    name: 'Brad Pitt',
    picture:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}

export const WithPictureLarge: Story = {
  args: {
    name: 'Brad Pitt',
    large: true,
    picture:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}

export const DarkBackground: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    name: 'Brad Pitt',
    dark: true
  }
}

export const DarkBackgroundLarge: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    name: 'Brad Pitt',
    dark: true,
    large: true
  }
}

export const DarkBackgroundWithPicture: Story = {
  decorators: [() => DarkBackgroundDecorator],
  args: {
    name: 'Brad Pitt',
    dark: true,
    large: true,
    picture:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}
