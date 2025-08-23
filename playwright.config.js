// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'html',
  use: {
    headless: true,       // don't show the browser
    slowMo: 500,           // slow down actions for visibility
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});