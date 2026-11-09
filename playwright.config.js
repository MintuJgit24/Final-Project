// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  reporter:'html',
  timeout:40*1000,
  expect:{
    timeout:60*5000
  },
  use:{
    headless:false,
    browserName:'chromium',
    screenshot:'only-on-failure',
    video:'retain-on-failure',
    trace:'retain-on-failure'
  },
  retries:2

});

