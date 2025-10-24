import twTheme from './svelte/lib/tw.theme.js'
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
      typography: ({ theme }) => ({
        popui: {
          css: {
            '--tw-prose-body': theme('colors.neutral[500]'),
            '--tw-prose-bullets': theme('colors.neutral[500]'),
            p: {
              marginLeft: '0px',
              marginTop: '12px',
              marginBottom: '12px'
            },
            ul: {
              marginLeft: '2px',
              marginTop: '12px',
              marginBottom: '12px'
            },
            li: {
              margin: '0px'
            }
          }
        }
      })
    }
  }
}
