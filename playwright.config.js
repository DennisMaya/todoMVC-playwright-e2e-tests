// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // maximum time one test can run for
  timeout: 30 * 1000,
  expect: {
    // maximum time expect() shoud wait for the condition to be met
    timeout: 5000,
  },
  fullyParallel: true,
  retries: 2,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    headless: true,       // don't show the browser
    slowMo: 500,           // slow down actions for visibility
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});