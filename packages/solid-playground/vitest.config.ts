import solidPlugin from 'vite-plugin-solid'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
    // if you have few tests, try commenting this
    // out to improve performance:
    isolate: false,
  },
})
