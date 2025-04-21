import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, 'svelte/stories/helpers'),
        path.resolve(__dirname, 'svelte/twind.config.js')
      ]
    }
  }
})
