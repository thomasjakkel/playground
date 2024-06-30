/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { configDefaults } from 'vitest/config'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      // https://vitest.dev/config/#coverage
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      include: ['src/**/*'],
      exclude: [...configDefaults.exclude],
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
})
