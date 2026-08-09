import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const dirname = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  // Relative base so one build works at findrun.app, under a GitHub Pages
  // project path, and in local preview (the legacy pages are all-relative too).
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
})
