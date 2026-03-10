# UI Automation Framework

A robust UI automation framework built with **Selenium**, **TypeScript**, **Cucumber (BDD)**, and **Mocha**, with **Allure** reporting.

---

## 🗂 Project Structure

```
ui-automation-framework/
├── src/
│   ├── features/              # Cucumber .feature files
│   │   └── login.feature
│   ├── step-definitions/      # Step implementations
│   │   └── login.steps.ts
│   ├── pages/                 # Page Object Model classes
│   │   ├── BasePage.ts
│   │   └── LoginPage.ts
│   ├── support/               # Cucumber World & Hooks
│   │   ├── hooks.ts
│   │   └── world.ts
│   ├── utils/                 # Shared utilities
│   │   ├── DriverFactory.ts
│   │   └── WaitHelper.ts
│   └── tests/                 # Mocha unit tests
│       ├── DriverFactory.test.ts
│       └── WaitHelper.test.ts
├── .env.example               # Environment variable template
├── .eslintrc.json
├── .gitignore
├── .mocharc.json
├── cucumber.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Full Setup Guide (WSL)

### Prerequisites

Make sure you have the following installed in your WSL:

```bash
# Check Node.js (requires >= 18)
node --version

# If not installed:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Check npm
npm --version

# Check git
git --version
```

Install **Allure CLI** for report generation:

```bash
# Option A — via npm (recommended)
npm install -g allure-commandline

# Option B — via apt (if Java is available)
sudo apt-get install allure
```

---

### Step 1 — Verify your GitHub SSH connection

Since you have an existing SSH key from another project, just verify it works:

```bash
ssh -T git@github.com
# Expected output: Hi Malconb! You've successfully authenticated...
```

If it fails, check your SSH agent:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa       # or id_ed25519, depending on your key type
ssh -T git@github.com
```

---

### Step 2 — Clone the repository

```bash
cd ~/projects

git clone git@github.com:Malconb/ui-automation-framework.git

cd ui-automation-framework
```

---

### Step 3 — Copy the project files into the repo

Copy all the generated files from this package into the cloned repo directory, preserving the folder structure.

---

### Step 4 — Install dependencies

```bash
npm install
```

---

### Step 5 — Set up environment variables

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```bash
nano .env
```

Key variables:
```
BASE_URL=https://your-app-url.com
HEADLESS=true
TEST_USER_EMAIL=user@example.com
TEST_USER_PASSWORD=your_password
```

---

### Step 6 — Install Chrome on WSL (if not already installed)

```bash
# Download and install Google Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb

# Verify
google-chrome --version
```

> **Note:** `chromedriver` is installed automatically as an npm package and matches the Chrome version.

---

### Step 7 — Run tests

```bash
# Run all Cucumber BDD tests (headless by default)
npm test

# Run in headed mode (visible browser)
npx cucumber-js --profile headed

# Run only @smoke tagged tests
npm run test:tags -- @smoke

# Run only @regression tagged tests
npm run test:tags -- @regression

# Run Mocha unit tests
npm run test:unit
```

---

### Step 8 — Generate and view Allure reports

```bash
# Generate the HTML report from allure-results
npm run allure:generate

# Open the report in your browser
npm run allure:open

# Or serve it live (auto-opens browser)
npm run allure:serve
```

> **WSL tip:** If `allure:open` doesn't launch a browser automatically, run:
> ```bash
> explorer.exe allure-report/index.html
> ```

---

### Step 9 — Build TypeScript

```bash
npm run build
# Output goes to ./dist/
```

---

### Step 10 — Push changes to GitHub

```bash
git add .
git commit -m "feat: initial framework setup with Selenium, TypeScript, Cucumber & Mocha"
git push origin main
```

---

## 📝 Adding New Tests

### 1. Create a Feature file

```gherkin
# src/features/my-feature.feature
@myFeature
Feature: My New Feature

  @smoke
  Scenario: My scenario
    Given I navigate to the home page
    When I do something
    Then I should see the result
```

### 2. Create a Page Object

```typescript
// src/pages/MyPage.ts
import { WebDriver, By } from 'selenium-webdriver';
import { BasePage } from './BasePage';

export class MyPage extends BasePage {
  private readonly heading = By.css('h1');

  constructor(driver: WebDriver) { super(driver); }

  async isPageDisplayed(): Promise<boolean> {
    return this.isDisplayed(this.heading);
  }
}
```

### 3. Create Step Definitions

```typescript
// src/step-definitions/my-feature.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { AutomationWorld } from '../support/world';

Given('I navigate to the home page', async function (this: AutomationWorld) {
  await this.driver.get(process.env.BASE_URL!);
});
```

---

## 🏷 Available Tags

| Tag | Purpose |
|---|---|
| `@smoke` | Fast, critical path tests |
| `@regression` | Full regression suite |
| `@login` | Login-related tests |
| `@slow` | Tests with extended timeouts |

---

## 🛠 Available Scripts

| Script | Description |
|---|---|
| `npm test` | Run all Cucumber tests |
| `npm run test:unit` | Run Mocha unit tests |
| `npm run test:tags -- @tag` | Run tests by tag |
| `npm run build` | Compile TypeScript |
| `npm run clean` | Remove build & report artifacts |
| `npm run allure:generate` | Generate Allure HTML report |
| `npm run allure:open` | Open generated Allure report |
| `npm run allure:serve` | Serve live Allure report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

# Run in headed mode (visible browser)
npx cucumber-js --profile headed
