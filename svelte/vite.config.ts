import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { 
    exclude: ["@internationalized/date"],
    // Force pre-bundle dependencies to avoid re-scanning
    include: [
      'clsx',
      'lodash-es',
      'date-fns',
      'dayjs',
      'flatpickr'
    ]
  },
  ssr: { 
    external: ["@internationalized/date"],
    // Prevent SSR issues with these packages
    noExternal: ['svelte-sonner', 'mode-watcher']
  },
  server: {
    fs: {
      // Allow serving files from parent directory
      strict: false
    },
    watch: {
      // Reduce file watching overhead - critical for preventing freezes
      usePolling: false,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/.svelte-kit/**',
        '**/tmp/**',
        '**/*_templ.go'
      ]
    }
  },
  test: { include: ["src/**/*.{test,spec}.{js,ts}"] },
});
