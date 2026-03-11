# UI Automation Framework

A robust UI automation framework built with **Playwright**, **TypeScript**, **Cucumber (BDD)**, and **Mocha/Chai**, with comprehensive reporting capabilities.

---

## 🗂 Project Structure

```
ui-test-automation-framework/
├── src/
│   ├── config/               # Test configuration
│   │   └── test-config.ts
│   ├── page-objects/         # Page Object Model classes
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   └── index.ts
│   ├── step-definitions/     # Cucumber step implementations
│   │   ├── login.steps.ts
│   │   └── navigation.steps.ts
│   ├── support/              # Cucumber World & Hooks
│   │   ├── hooks.ts
│   │   ├── world.ts
│   │   ├── global-setup.ts
│   │   └── global-teardown.ts
│   ├── utils/                # Shared utilities
│   │   ├── test-data.ts
│   │   ├── wait-helpers.ts
│   │   ├── assertion-helpers.ts
│   │   └── index.ts
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   └── tests/                # Unit tests
│       ├── unit/
│       │   ├── test-data.test.ts
│       │   └── validation.test.ts
│       └── e2e/              # Playwright E2E tests
├── features/                 # Cucumber .feature files
│   ├── login.feature
│   └── navigation.feature
├── reports/                  # Test reports
│   ├── screenshots/
│   ├── videos/
│   └── html/
├── .env                      # Environment variables
├── .eslintrc.json
├── .gitignore
├── .mocharc.json
├── .prettierrc
├── cucumber.js
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Setup Guide

### Prerequisites

Make sure you have the following installed:

```bash
# Check Node.js (requires >= 18)
node --version

# Check npm
npm --version

# Check git
git --version
```

---

### Step 1 — Clone the repository

```bash
git clone git@github.com:Malconb/ui-test-automation-framework.git
cd ui-test-automation-framework
```

---

### Step 2 — Install dependencies

```bash
npm install
```

---

### Step 3 — Install Playwright browsers

```bash
npm run install:playwright
```

---

### Step 4 — Set up environment variables

Create a `.env` file with your configuration:

```bash
BASE_URL=https://your-app-url.com
API_BASE_URL=https://api.example.com
HEADLESS=true
TEST_TIMEOUT=10000
TEST_RETRIES=2
ENABLE_VIDEO=true
ENABLE_TRACING=true
ENABLE_SCREENSHOTS=true
```

---

### Step 5 — Run tests

```bash
# Run all Cucumber BDD tests (headless by default)
npm test

# Run E2E tests with Playwright
npm run test:playwright

# Run in headed mode (visible browser)
npm run test:playwright:headed

# Run with debugging
npm run test:playwright:debug

# Run unit tests with Mocha/Chai
npm run test:unit

# Run all tests
npm run test:all

# Run tests in parallel
npm run test:e2e:parallel

# Run tests with retry
npm run test:e2e:retry
```

---

## 📝 Adding New Tests

### 1. Create a Feature file

```gherkin
# features/my-feature.feature
@myFeature
Feature: My New Feature

  @smoke
  Scenario: My scenario
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to the dashboard
```

### 2. Create a Page Object

```typescript
// src/page-objects/my-page.ts
import { Page } from 'playwright';
import { BasePage } from './base.page';

export class MyPage extends BasePage {
  private readonly heading = 'h1';
  private readonly button = '#my-button';

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async isPageDisplayed(): Promise<boolean> {
    return await this.isVisible(this.heading);
  }

  async clickMyButton(): Promise<void> {
    await this.clickElement(this.button);
  }
}
```

### 3. Create Step Definitions

```typescript
// src/step-definitions/my-feature.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { MyPage } from '../page-objects/my-page';

Given('I am on the login page', async function (this: CustomWorld) {
  const myPage = new MyPage(this.page!, this.baseUrl);
  await myPage.navigateToLogin();
});

When('I enter valid credentials', async function (this: CustomWorld) {
  // Implementation here
});
```

---

## 🏷 Available Tags

| Tag | Purpose |
|---|---|
| `@smoke` | Fast, critical path tests |
| `@regression` | Full regression suite |
| `@login` | Login-related tests |
| `@retry` | Tests that should be retried on failure |
| `@slow` | Tests with extended timeouts |

---

## 🛠 Available Scripts

| Script | Description |
|---|---|
| `npm test` | Run all Cucumber tests |
| `npm run test:e2e` | Run Cucumber E2E tests |
| `npm run test:e2e:parallel` | Run E2E tests in parallel |
| `npm run test:e2e:retry` | Run E2E tests with retry |
| `npm run test:unit` | Run Mocha unit tests |
| `npm run test:unit:watch` | Run unit tests in watch mode |
| `npm run test:playwright` | Run Playwright tests |
| `npm run test:playwright:headed` | Run Playwright tests in headed mode |
| `npm run test:playwright:debug` | Run Playwright tests with debugging |
| `npm run test:all` | Run all tests (unit + E2E) |
| `npm run build` | Compile TypeScript |
| `npm run build:watch` | Compile TypeScript in watch mode |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting with Prettier |
| `npm run clean` | Remove build & report artifacts |
| `npm run install:playwright` | Install Playwright browsers |
| `npm run install:playwright:browsers` | Install Playwright browsers with dependencies |

---

## 🎯 Framework Features

- **Playwright**: Modern, fast, and reliable browser automation
- **TypeScript**: Type-safe development with IntelliSense support
- **Cucumber BDD**: Behavior-driven development with Gherkin syntax
- **Mocha/Chai**: Powerful unit testing framework with assertions
- **Page Object Model**: Maintainable and reusable page objects
- **Parallel Execution**: Run tests in parallel for faster execution
- **Comprehensive Reporting**: HTML reports, screenshots, videos, and traces
- **Retry Mechanism**: Automatic retry for flaky tests
- **Environment Configuration**: Flexible configuration via environment variables
- **Mobile Testing**: Built-in support for mobile viewport testing
- **Cross-browser**: Support for Chrome, Firefox, Safari, and Edge

---

## 📊 Reports and Artifacts

The framework generates comprehensive reports and artifacts:

- **HTML Reports**: Interactive test reports in `reports/html/`
- **Screenshots**: Automatic screenshots on failures in `reports/screenshots/`
- **Videos**: Test execution videos in `reports/videos/`
- **Traces**: Detailed execution traces for debugging
- **JSON Reports**: Machine-readable test results

---

## 🔧 Configuration

### Playwright Configuration

The `playwright.config.ts` file contains Playwright-specific settings including:
- Browser configurations
- Test directories
- Reporting options
- Global setup/teardown
- Screenshot and video settings

### Cucumber Configuration

The `cucumber.js` file contains Cucumber-specific settings including:
- Step definition paths
- Feature file locations
- Formatter options
- Parallel execution settings
- Retry configuration

### TypeScript Configuration

The `tsconfig.json` file contains TypeScript compiler options for:
- Target and module settings
- Strict type checking
- Source map generation
- Module resolution

---

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Install browsers**: `npm run install:playwright`
3. **Configure environment**: Copy `.env.example` to `.env` and update values
4. **Run tests**: `npm test`
5. **View reports**: Open `reports/html/index.html` in your browser

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

---

## 📄 License

This project is licensed under the ISC License.
