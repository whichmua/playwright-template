import { defineConfig, devices } from "@playwright/test";
import { ApiUrls } from "./support/urls";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 3,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
      outputDir: "test-results/chromium",
    },
    {
      name: "firefox",
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices["Desktop Firefox"] },
      outputDir: "test-results/firefox",
    },
    {
      name: "webkit",
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.api\.spec\.ts/,
      use: { ...devices["Desktop Safari"] },
      outputDir: "test-results/webkit",
    },

    {
      name: "api",
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: ApiUrls.baseUrl,
      },
      outputDir: "test-results/api",
    },
  ],

  workers: process.env.CI ? 2 : undefined,
});
