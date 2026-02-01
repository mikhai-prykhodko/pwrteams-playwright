import {defineConfig, devices} from '@playwright/test';
import 'dotenv/config';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
// Helper function to get environment variables with defaults
const getEnvVar = (key: string, defaultValue = ''): string => {
  return process.env[key] ?? defaultValue;
};

export default defineConfig({
  // globalSetup: require.resolve('./global-setup.ts'),
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only (CI must be exactly 'true', e.g. set by GitHub Actions) */
  retries: getEnvVar('CI', 'false') === 'true' ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: getEnvVar('CI', 'false') === 'true' ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'html',
      {open: getEnvVar('CI', 'false') === 'true' ? 'never' : 'on-failure'},
    ],
    ['list', {printSteps: true}],
  ],
  testMatch: /.*\.spec\.ts/,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: Number(getEnvVar('GLOBAL_TIMEOUT', '120000')),
  expect: {
    timeout: Number(getEnvVar('WAIT_TIMEOUT', '20000')),
  },
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: getEnvVar('BASE_URL', 'https://www.tui.nl/'),

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-first-failure',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',
    /* Test ID attribute */
    testIdAttribute: 'data-test-id',
    actionTimeout: Number(getEnvVar('WAIT_TIMEOUT', '20000')),
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: process.env.CI === 'true',
      },
    },

    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },

    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
  ],
});
