import type { Preview } from '@storybook/svelte'
import 'inter-ui/inter.css'
import '../src/fonts/fonts.css'
import { install } from '@twind/core'
import twconfig from '../src/twind.config.js'
install(twconfig)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
