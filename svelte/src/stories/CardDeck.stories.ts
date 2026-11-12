import type { Meta, StoryObj } from '@storybook/sveltekit'
import CardDeckWithContent from './helpers/CardDeckWithContent.svelte'
import CardDeckReferences from './helpers/CardDeckReferences.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'
import MaxWidthMdDecorator from './decorartors/MaxWidthMdDecorator.svelte'

const meta = {
  title: 'Components/CardDeck',
  component: CardDeckWithContent as any,
  tags: ['autodocs'],
  decorators: [
    () => ({ Component: MarginDecorator as any }),
    () => ({ Component: MaxWidthMdDecorator as any })
  ]
} satisfies Meta<CardDeckWithContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Payment'
  }
}

export const WithAction: Story = {
  args: {
    label: 'Payment',
    withAction: true
  }
}

export const WithoutHead: Story = {
  args: {}
}

// Link cards in scrolling decks: each card navigates, and the long lists cap
// their height under a fixed head.
export const References: Story = {
  render: () => ({ Component: CardDeckReferences as any })
}

export const CustomClass: Story = {
  args: {
    label: 'Payment',
    withAction: true,
    class:
      '[&_[data-card-deck-label]]:text-foreground-accent [&_[data-card-deck-card]]:py-4'
  }
}
