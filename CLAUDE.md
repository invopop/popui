# popui Code Style

## Svelte Components

### Svelte 5 Runes
- Use `$props()`, `$state()`, `$derived()`, `$effect()` runes throughout.
- Prefer `$derived(value)` over `$state(value)` + `$effect(() => { state = value })` to sync from props (per `svelte/prefer-writable-derived` lint rule).
- Derived values can be reassigned to temporarily override them (Svelte 5.25+).

### Conditional Classes
- Use `clsx` with **object syntax** for all conditional classes. Never use ternary expressions inside class strings.
- For simple one-off cases, inline `clsx()` directly in the template:
  ```svelte
  <Icon class={clsx('w-3 h-3 transition-transform', { '-rotate-90': !isOpen })} />
  ```
- For styles used in multiple places or with many conditions, extract a `$derived`:
  ```svelte
  let styles = $derived(
    clsx('base-classes', {
      'class-a': conditionA,
      'class-b': conditionB
    })
  )
  ```
- Interpolate derived style strings with other static classes using template literals:
  ```svelte
  <span class="{styles} other-static-classes">
  ```

### class prop & cn
- Every component must accept a `class?: string` prop and apply it to the root element using `cn()` (Tailwind merge helper from `./utils.js`):
  ```svelte
  let { ..., class: className }: MyProps = $props()
  // ...
  <div class={cn('default-root-classes', className)}>
  ```
- Use `cn` (not `clsx`) when merging with `className`, so conflicting Tailwind classes are resolved correctly.

### data-attributes on inner elements
- Add `data-[component]-[part]` attributes to inner elements so consumers can target them from outside using the `class` prop with Tailwind's `[&_[data-*]]` selector syntax.
- Example for an `Accordion` component:
  ```svelte
  <div class={cn('flex flex-col', className)}>
    <button data-accordion-trigger ...>
      <p data-accordion-label ...>{label}</p>
      <Icon data-accordion-icon ... />
    </button>
    <div data-accordion-content>...</div>
  </div>
  ```
- Then consumers can write:
  ```svelte
  <Accordion class="[&_[data-accordion-label]]:text-foreground" />
  ```

## Storybook Stories

Stories live in `svelte/src/stories/` as `[ComponentName].stories.ts`.

### Rules
- Cover every meaningful visual state (open/closed, disabled, with/without optional props, etc.).
- When a component has `children` or snippet slots, create a helper in `svelte/src/stories/helpers/[ComponentName]WithContent.svelte`. If the component makes no sense without content (e.g. Accordion), use the helper as `meta.component` for all stories. If the component has meaningful standalone behavior, mix bare and helper stories as needed.
- Always include a `CustomClass` story that exercises the `class` prop with `[&_[data-*]]` selectors to verify inner element targeting works.
- Use `MarginDecorator` (and width decorators when appropriate) from `./decorartors/`.

### Structure
```ts
import type { Meta, StoryObj } from '@storybook/sveltekit'
import MyComponent from '../lib/MyComponent.svelte'
import MarginDecorator from './decorartors/MarginDecorator.svelte'

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent as any,
  tags: ['autodocs'],
  decorators: [() => MarginDecorator as any]
} satisfies Meta<MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { ... } }
```
