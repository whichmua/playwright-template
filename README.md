# Playwright Template

This repository houses end-to-end tests written with [Playwright](https://playwright.dev/) in **TypeScript**. It’s structured for use with **VSCode Workspaces** to support a modular test architecture.

## Getting Started

### 1. Using VSCode Workspace

Open the workspace for full context across all projects:

```bash
code playwright-template.code-workspace
```

This gives you visibility across folders with unified settings and linting.

### 2. Install Dependencies & Playwright Browsers

```bash
npm run install:all
```

## Running & Debugging Tests in VSCode

All tests in this framework are run using the Playwright VSCode extension. Here’s how to run, debug, inspect, and select locators without leaving your editor.

### Running Tests

1. Open the Testing panel in VSCode by clicking the beaker icon on the sidebar or pressing `Cmd+Shift+P` and searching for `Show Test Explorer`.
2. In the playwright panel, click the gear icon ⚙️ next to `CONFIGS`
3. Select the test project (if not already selected)
4. Click the ▶️ icon next to a specific test or suite to run it.

### Debugging Tests

Click the 🐞 bug icon next to a test to run it in debug mode. This opens the Playwright Inspector, allowing you to:

- Step through each test action
- View browser state
- Pause/resume execution
- Inspect selectors in real-time

### Viewing Traces (On Test Failure)

Playwright automatically records traces on failure.

1. In the Test Explorer, click the 📂 folder icon next to a failed test.
2. Choose Show Trace.
3. This opens the Trace Viewer inside VSCode (no CLI needed).

You can view:

- DOM snapshots
- Console logs
- Network requests
- Timings and actions

### Locator Selection

You can use the extension’s code generation tool to explore and pick locators:

1. Press `Cmd+Shift+P` → search for `Playwright: Pick Locator`
2. Enter the app URL
3. A browser window opens - hover or click on elements to get robust locators (like getByRole, getByText)
4. Copy and paste the suggested locator into your test
