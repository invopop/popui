import { defineConfig } from '@twind/core'
import presetAutoprefix from '@twind/preset-autoprefix'
import presetTailwind from '@twind/preset-tailwind'
import presetTailwindForms from '@twind/preset-tailwind-forms'
import theme from './lib/tw.theme.js'

export default defineConfig({
  presets: [
    presetAutoprefix(),
    presetTailwind(),
    presetTailwindForms({
      strategy: 'class'
    })
  ],
  theme
})
