<script lang="ts" module>
  import { cn, type WithElementRef } from '$lib/utils.js'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
  import { type VariantProps, tv } from 'tailwind-variants'
  import type { IconSource } from '@steeze-ui/svelte-icon'

  export const buttonVariants = tv({
    base: 'inline-flex items-center justify-center font-medium text-base whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-selected focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 relative overflow-hidden box-border cursor-pointer',
    variants: {
      variant: {
        primary:
          'bg-background-accent text-foreground-inverse border border-border shadow-button-primary hover:bg-background-accent-hover active:bg-background-accent-hover active:shadow-button-pressed [&_svg]:text-icon-inverse',
        warning:
          'bg-background-warning-inverse text-foreground-inverse border border-border shadow-button-primary hover:bg-background-warning-bold active:bg-background-warning-bold active:shadow-button-pressed [&_svg]:text-icon-inverse',
        danger:
          'bg-background-default-tertiary text-foreground-critical border border-border shadow-button-default hover:bg-background-critical-bold hover:text-foreground-inverse hover:border-background-critical-bold active:bg-background-critical-bold active:text-foreground-inverse active:border-background-critical-bold active:shadow-[0px_4px_4px_-1px_inset_rgba(11,11,16,0.16)] [&_svg]:text-icon-critical hover:[&_svg]:text-icon-inverse active:[&_svg]:text-icon-inverse',
        outline:
          'bg-background text-foreground border border-border-default-secondary shadow-button-default hover:border-border-default-secondary-hover active:shadow-button-pressed [&_svg]:text-icon',
        ghost:
          'bg-transparent text-foreground hover:shadow-button-default active:shadow-button-pressed hover:bg-background-default-tertiary-hover active:bg-background-default-tertiary-hover [&_svg]:text-icon',
        secondary:
          'bg-background-default-tertiary text-foreground shadow-button-default hover:bg-background-default-tertiary-hover active:bg-background-default-tertiary-hover active:shadow-button-pressed [&_svg]:text-icon',
        selected:
          'bg-background-selected border border-border-selected text-foreground-selected shadow-button-default hover:bg-background-selected-hover active:bg-background-selected-hover active:shadow-button-pressed [&_svg]:text-icon-selected',
        dark: 'bg-transparent text-foreground-inverse border border-border-inverse-secondary hover:bg-background-selected-inverse active:bg-background-inverse-tertiary active:shadow-button-dark-pressed [&_svg]:text-icon-inverse',
        'dark-ghost':
          'bg-transparent text-foreground-inverse hover:bg-background-selected-inverse active:bg-background-inverse-tertiary active:shadow-button-dark-pressed [&_svg]:text-icon-inverse'
      },
      size: {
        sm: 'h-6 rounded-sm',
        md: 'h-7 rounded-md',
        lg: 'h-8 rounded-lg'
      },
      iconOnly: {
        true: '',
        false: ''
      },
      hasIcon: {
        true: '',
        false: ''
      },
      stackedLeft: {
        true: '',
        false: ''
      },
      stackedRight: {
        true: '',
        false: ''
      }
    },
    compoundVariants: [
      // Icon-only padding (varies by size) - must come first to avoid conflicts
      {
        size: 'sm',
        iconOnly: true,
        class: '!p-1'
      },
      {
        size: 'md',
        iconOnly: true,
        class: '!p-1.5'
      },
      {
        size: 'lg',
        iconOnly: true,
        class: '!p-2'
      },
      // Vertical padding for buttons with text
      {
        size: ['sm', 'md'],
        iconOnly: false,
        class: 'py-1'
      },
      {
        size: 'lg',
        iconOnly: false,
        class: 'py-1.5'
      },
      // No icon - symmetric padding
      {
        size: ['sm', 'md'],
        iconOnly: false,
        hasIcon: false,
        class: 'px-2'
      },
      {
        size: 'lg',
        iconOnly: false,
        hasIcon: false,
        class: 'px-3'
      },
      // Icon-left - asymmetric padding (less on icon side)
      {
        size: ['sm', 'md'],
        iconOnly: false,
        hasIcon: true,
        class: 'pl-1.5 pr-2'
      },
      {
        size: 'lg',
        iconOnly: false,
        hasIcon: true,
        class: 'pl-2 pr-3'
      },
      // Icon-only uses bold icon variants
      {
        variant: ['secondary', 'outline', 'ghost'],
        iconOnly: true,
        class: '[&_svg]:!text-icon-default-bold'
      },
      {
        variant: 'selected',
        iconOnly: true,
        class: '[&_svg]:!text-icon-selected'
      },
      {
        variant: ['primary', 'warning', 'dark-ghost'],
        iconOnly: true,
        class: '[&_svg]:!text-icon-inverse-bold'
      },
      {
        variant: 'dark',
        iconOnly: true,
        class: '[&_svg]:!text-icon-inverse-bold'
      },
      {
        size: 'sm',
        iconOnly: true,
        class: 'w-6'
      },
      {
        size: 'md',
        iconOnly: true,
        class: 'w-7'
      },
      {
        size: 'lg',
        iconOnly: true,
        class: 'w-8'
      },
      {
        stackedLeft: true,
        class:
          '!rounded-l-none hover:!bg-background-default-secondary active:!bg-background-default-secondary'
      },
      {
        stackedRight: true,
        class:
          '!rounded-r-none hover:!bg-background-default-secondary active:!bg-background-default-secondary'
      }
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
      hasIcon: false,
      stackedLeft: false,
      stackedRight: false
    }
  })

  export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
  export type ButtonSize = VariantProps<typeof buttonVariants>['size']
  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant
      size?: ButtonSize
      icon?: IconSource
      iconPosition?: 'left' | 'right'
      iconClass?: string
      stackedLeft?: boolean
      stackedRight?: boolean
    }
</script>

<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'

  let {
    class: className,
    variant = 'primary',
    size = 'lg',
    icon,
    iconPosition = 'left',
    iconClass = '',
    stackedLeft = false,
    stackedRight = false,
    ref = $bindable(null),
    href = undefined,
    type = 'button',
    disabled,
    children,
    onclick,
    ...rest
  }: ButtonProps = $props()

  let iconOnly = $derived(!children)
  let hasIcon = $derived(!!icon && !iconOnly)

  let iconSize = $derived(
    {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-4'
    }[size]
  )

  // For icon-right, we need to reverse the padding
  let paddingClass = $derived(
    iconPosition === 'right' && hasIcon ? (size === 'lg' ? 'pl-3 pr-2' : 'pl-2 pr-1.5') : ''
  )
</script>

{#snippet iconContent()}
  {#if icon}
    <div class={cn('relative z-10', iconClass && `[&_svg]:${iconClass}`)}>
      <Icon src={icon} class={iconSize} />
    </div>
  {/if}
{/snippet}

{#snippet buttonContent()}
  <div
    class={cn(
      'inline-flex items-center transition-transform group-active:translate-y-px',
      !iconOnly && 'gap-1'
    )}
  >
    {#if icon && !children}
      {@render iconContent()}
    {:else if iconPosition === 'right'}
      {#if children}
        <span class="z-10">{@render children()}</span>
      {/if}
      {#if icon}
        {@render iconContent()}
      {/if}
    {:else}
      {#if icon}
        {@render iconContent()}
      {/if}
      {#if children}
        <span class="z-10">{@render children()}</span>
      {/if}
    {/if}
  </div>
{/snippet}

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={cn(
      buttonVariants({ variant, size, iconOnly, hasIcon, stackedLeft, stackedRight }),
      iconPosition === 'right' && 'flex-row-reverse',
      paddingClass,
      className
    )}
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    role={disabled ? 'link' : undefined}
    tabindex={disabled ? -1 : undefined}
    {...rest}
  >
    {@render buttonContent()}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    class={cn(
      buttonVariants({ variant, size, iconOnly, hasIcon, stackedLeft, stackedRight }),
      'group',
      iconPosition === 'right' && 'flex-row-reverse',
      paddingClass,
      className
    )}
    {type}
    {disabled}
    {onclick}
    {...rest}
  >
    {@render buttonContent()}
  </button>
{/if}
