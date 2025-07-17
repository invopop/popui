/* eslint-disable @typescript-eslint/no-var-requires */
import twTheme from './svelte/lib/tw.theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    /* tslint:disable no-var-requires */
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('@tailwindcss/typography')
  ],
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
