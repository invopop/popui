import type { Meta, StoryObj } from '@storybook/sveltekit'

import ProfileAvatar from '../lib/ProfileAvatar.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthSmDecorator from './decorartors/MaxWidthSmDecorator.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'
import { User } from '@steeze-ui/heroicons'

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta = {
  title: 'Components/ProfileAvatar',
  component: ProfileAvatar as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any, () => MaxWidthSmDecorator as any]
} satisfies Meta<ProfileAvatar>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const NoPicture: Story = {
  args: {
    name: 'Brad Pitt'
  }
}

export const NoPictureXS: Story = {
  args: {
    name: 'Brad Pitt',
    variant: 'xs'
  }
}

export const NoPictureMD: Story = {
  args: {
    name: 'Brad Pitt',
    variant: 'md'
  }
}

export const NoPictureLG: Story = {
  args: {
    name: 'Brad Pitt',
    variant: 'lg'
  }
}

export const NoPictureXL: Story = {
  args: {
    name: 'Brad Pitt',
    variant: 'xl'
  }
}

export const WithPicture: Story = {
  args: {
    name: 'Brad Pitt',
    picture:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}

export const WithBrokenPicture: Story = {
  args: {
    name: 'Brad Pitt',
    picture: 'https://images.unsplash.com/photo-1550525811-'
  }
}

export const WithPictureXL: Story = {
  args: {
    name: 'Brad Pitt',
    variant: 'xl',
    picture:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}

export const DarkBackground: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    name: 'Brad Pitt',
    dark: true
  }
}

export const DarkBackgroundXL: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    name: 'Brad Pitt',
    dark: true,
    variant: 'xl'
  }
}

export const DarkBackgroundWithPicture: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    name: 'Brad Pitt',
    dark: true,
    variant: 'xl',
    picture:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
}

export const WithIcon: Story = {
  args: {
    name: 'Brad Pitt',
    icon: User
  }
}

export const WithIconXL: Story = {
  args: {
    name: 'Brad Pitt',
    icon: User,
    variant: 'xl'
  }
}

export const WithIconDark: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    name: 'Brad Pitt',
    icon: User,
    dark: true
  }
}

export const WithIconDarkXL: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  args: {
    name: 'Brad Pitt',
    icon: User,
    dark: true,
    variant: 'xl'
  }
}
