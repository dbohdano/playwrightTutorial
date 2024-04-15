const { defineConfig, devices } = require('@playwright/test');
import dotenv from 'dotenv';
import path from 'path';

const nodeEnv = process.env.NODE_ENV?.trim() || 'dev';
const config = dotenv.config({ path: path.join(__dirname, '.', 'config', `.env.${nodeEnv}`) });

const {
  domain,
  BASIC_AUTH_USER,
  BASIC_AUTH_PWD,
} = config.parsed;

module.exports = defineConfig({
  testDir: './answers',
  timeout: 3 * 60 * 1000,
  expect: { timeout: 10000 },
  /* Run tests in files in parallel */
  fullyParallel: true,
  retries: 1,
  workers: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: domain,
    httpCredentials: {
      username: BASIC_AUTH_USER,
      password:  BASIC_AUTH_PWD
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

