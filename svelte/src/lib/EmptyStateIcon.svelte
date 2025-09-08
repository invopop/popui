<script lang="ts">
  import IconEmpty from './svg/IconEmpty.svelte'
  import { Icon, type IconSource } from '@steeze-ui/svelte-icon'
  import { EmptyStateIconProps } from './types'

  let {
    icon = undefined,
    title = '',
    description = '',
    check = false,
    children
  }: EmptyStateIconProps = $props()
</script>

<div
  class="flex flex-col text-center items-center justify-center h-full font-sans gap-1"
  aria-label={title}
>
  {#if icon}
    <div class="relative h-[120px] w-[352px] max-w-sm">
      <IconEmpty />
      <div class="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]">
        <Icon src={icon} class="h-12 w-12 text-workspace-accent" />
        {#if check}
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute top-[-16px] right-[-16px]"
          >
            <path
              d="M13 1C6.3835 1 1 6.3835 1 13C1 19.6165 6.3835 25 13 25C19.6165 25 25 19.6165 25 13C25 6.3835 19.6165 1 13 1Z"
              fill="#169958"
            />
            <circle cx="13" cy="13" r="10" stroke="white" stroke-opacity="0.4" stroke-width="0.6" />
            <path
              d="M18.1078 9.82205C15.7021 11.6837 13.6627 14.2538 12.0477 17.4584C11.8808 17.7912 11.5495 17.9999 11.1884 17.9999C10.83 18.004 10.4922 17.7885 10.3253 17.4517C9.58119 15.9471 8.7491 14.7239 7.78243 13.7123C7.40457 13.3176 7.40586 12.6764 7.78632 12.2831C8.16418 11.8898 8.78016 11.8898 9.15932 12.2871C9.90083 13.063 10.5699 13.9413 11.182 14.9435C12.7853 12.1888 14.7199 9.92443 16.9509 8.19887C17.3805 7.8675 17.9888 7.9591 18.3084 8.40766C18.628 8.85488 18.5387 9.48934 18.1078 9.82205Z"
              fill="white"
            />
          </svg>
        {/if}
      </div>
    </div>
  {/if}
  <div class="space-y-0.5">
    <h4 class="font-medium text-base text-neutral-800 tracking-tight">{title}</h4>
    <p class="max-w-xs text-base text-neutral-500 tracking-normal">{description}</p>
    <p>{@render children?.()}</p>
  </div>
</div>
