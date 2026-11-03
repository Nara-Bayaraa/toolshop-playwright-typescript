/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import { USER_FILE, ADMIN_FILE } from './playwright/auth-paths';
// USER_FILE: path to the saved customer session
// ADMIN_FILE: path to the saved admin session

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
// loads USER_EMAIL, ADMIN_EMAIL, BASE_URL and the rest from .env

const BASE_URL = process.env.BASE_URL || 'https://practicesoftwaretesting.com';
// BASE_URL = the .env value if it's set and not empty, otherwise the public site

const API_URL = process.env.API_URL || 'https://api.practicesoftwaretesting.com';
// API_URL = the .env value if it's set and not empty, otherwise the public API

export default defineConfig({
  testDir: './tests',
  // default folder for projects that don't set their own testDir

  fullyParallel: true,
  // runs tests inside each file in parallel

  forbidOnly: !!process.env.CI,
  // fails the CI run if a test.only was left in the code

  retries: process.env.CI ? 2 : 0,
  // retries failed tests twice on CI, never locally

  workers: process.env.CI ? 1 : undefined,
  // one worker on CI, Playwright picks the number locally

  reporter: 'html',
  // creates the HTML report after each run

  use: {
    trace: 'on-first-retry',
    // records a trace when a failed test is retried

    testIdAttribute: 'data-test',
    // tells getByTestId() to read data-test="..." on this site
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      // only runs files ending in .setup.ts
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL,
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_URL },
      // no storageState, API tests get their own token
    },
    {
      name: 'ui-customer',
      testDir: './tests/ui-customer',
      dependencies: ['setup'],
      // setup runs first so the customer session exists
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL,
        storageState: USER_FILE,
        // every test here starts logged in as customer
      },
    },
    {
      name: 'ui-admin',
      testDir: './tests/ui-admin',
      dependencies: ['setup'],
      // setup runs first so the admin session exists
      use: {
        ...devices['Desktop Chrome'],
        baseURL: BASE_URL,
        storageState: ADMIN_FILE,
        // every test here starts logged in as admin
      },
    },
  ],
});