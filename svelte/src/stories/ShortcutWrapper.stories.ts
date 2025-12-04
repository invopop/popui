import type { Meta, StoryObj } from '@storybook/svelte'
import ShortcutWrapper from '../lib/ShortcutWrapper.svelte'
import ShortcutWrapperWithIcon from './helpers/ShortcutWrapperWithIcon.svelte'
import ShortcutWrapperWithLetter from './helpers/ShortcutWrapperWithLetter.svelte'
import DarkBackgroundDecorator from './decorartors/DarkBackgroundDecorator.svelte'

const meta = {
  title: 'Components/ShortcutWrapper',
  component: ShortcutWrapper as any,
  tags: ['autodocs']
} satisfies Meta<ShortcutWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const SmallLight: Story = {
  render: () => ({
    Component: ShortcutWrapperWithIcon as any,
    props: {
      size: 'sm',
      theme: 'light'
    }
  })
}

export const SmallNavigation: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  render: () => ({
    Component: ShortcutWrapperWithIcon as any,
    props: {
      size: 'sm',
      theme: 'navigation'
    }
  })
}

export const MediumLight: Story = {
  render: () => ({
    Component: ShortcutWrapperWithIcon as any,
    props: {
      size: 'md',
      theme: 'light'
    }
  })
}

export const MediumNavigation: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  render: () => ({
    Component: ShortcutWrapperWithIcon as any,
    props: {
      size: 'md',
      theme: 'navigation'
    }
  })
}

export const LetterSmallLight: Story = {
  render: () => ({
    Component: ShortcutWrapperWithLetter as any,
    props: {
      size: 'sm',
      theme: 'light',
      letter: 'F'
    }
  })
}

export const LetterSmallNavigation: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  render: () => ({
    Component: ShortcutWrapperWithLetter as any,
    props: {
      size: 'sm',
      theme: 'navigation',
      letter: 'F'
    }
  })
}

export const LetterMediumLight: Story = {
  render: () => ({
    Component: ShortcutWrapperWithLetter as any,
    props: {
      size: 'md',
      theme: 'light',
      letter: 'F'
    }
  })
}

export const LetterMediumNavigation: Story = {
  decorators: [() => DarkBackgroundDecorator as any],
  render: () => ({
    Component: ShortcutWrapperWithLetter as any,
    props: {
      size: 'md',
      theme: 'navigation',
      letter: 'F'
    }
  })
}
