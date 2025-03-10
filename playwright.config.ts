import type { PlaywrightTestConfig } from '@playwright/test';

const config = {
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:5000',
    trace: 'on-first-retry',
    video: 'on-first-retry',
    launchOptions: {
      args: ['--disable-web-security']
    }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
      },
    },
  ],
  webServer: {
    command: 'yarn dev -p 5000',
    port: 5000,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
} satisfies PlaywrightTestConfig;

export default config; 