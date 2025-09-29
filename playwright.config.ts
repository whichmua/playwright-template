import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
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
      name: "UI - Chromium",
      testMatch: /.*\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "API",
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        baseURL: "https://automationexercise.com/api",
      },
    },
  ],

  workers: process.env.CI ? 2 : undefined,
});
