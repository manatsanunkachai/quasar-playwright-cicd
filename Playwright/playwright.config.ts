
import { defineConfig } from '@playwright/test'
import path from 'node:path'

const dist = path.resolve(__dirname, '../dist/spa')

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
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  webServer: {
    command: `npx http-server "${dist}" -p 4173 -s`,
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
})
