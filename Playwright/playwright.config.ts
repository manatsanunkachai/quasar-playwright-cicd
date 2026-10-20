
import { defineConfig } from '@playwright/test'
import path from 'node:path'

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 1,

  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 1280, height: 800 },
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],

  webServer: {
    command: 'node test-server.cjs',
    cwd: path.resolve(__dirname),
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
})
