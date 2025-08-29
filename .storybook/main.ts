import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
  stories: ['../svelte/**/*.mdx', '../svelte/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },

  staticDirs: ['../svelte/static'],

  async viteFinal(config) {
    const { mergeConfig } = await import('vite')

    return mergeConfig(config, {
      server: {
        fs: {
          allow: ['./svelte']
        }
      }
    })
  }
}
export default config
