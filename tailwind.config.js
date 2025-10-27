import twTheme from './svelte/src/lib/tw.theme.js'
import safelist from './tailwind.safelist.js'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    forms({
      strategy: 'class'
    }),
    typography
  ],
  safelist,
  theme: {
    extend: {
      ...twTheme.extend,
      colors: {
        ...twTheme.extend.colors
      }
    }
  },
  content: ['./svelte/**/*.{html,js,svelte,ts}', './styles.css']
}
