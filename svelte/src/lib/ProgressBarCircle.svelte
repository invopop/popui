<script lang="ts">
  import type { ProgressBarCircleProps } from './types'

  let { progress, size, variant = 'default' }: ProgressBarCircleProps = $props()

  let angle = $derived(360 * progress)
  let filledColor = $derived(
    variant === 'dark' ? 'var(--color-icon-inverse-bold)' : 'var(--color-icon-selected-default)'
  )
  let restColor = $derived(
    variant === 'dark'
      ? 'var(--color-background-selected-inverse-hover)'
      : 'var(--color-background-default-tertiary)'
  )
  let background = $derived(
    `conic-gradient(${filledColor} 0deg ${angle}deg, ${restColor} ${angle}deg 360deg)`
  )
  let cssVarStyles = $derived(`--background:${background}; --size: ${size}px; --ring: 1.5px;`)
</script>

<div id="progress-circle" style={cssVarStyles}></div>

<style>
  #progress-circle {
    background: var(--background);
    -webkit-mask: radial-gradient(
      circle,
      transparent 0,
      transparent calc(50% - var(--ring)),
      black calc(50% - var(--ring)),
      black 100%
    );
    mask: radial-gradient(
      circle,
      transparent 0,
      transparent calc(50% - var(--ring)),
      black calc(50% - var(--ring)),
      black 100%
    );
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
    transition: all 500ms ease-in;
    will-change: transform;
  }
</style>
