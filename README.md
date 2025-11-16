# Playwright TypeScript Test Automation Framework

A modern test automation framework built with Playwright and TypeScript.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🚀 Getting Started

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## 📁 Project Structure

```
.
├── pages/              # Page Object Models
│   ├── BasePage.ts     # Base page class with common methods
│   └── ExamplePage.ts  # Example page object
├── tests/              # Test files
│   ├── example.spec.ts      # Example test cases
│   └── pageobject.spec.ts   # Page object pattern example
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🧪 Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests in UI mode (interactive):
```bash
npm run test:ui
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run specific test file:
```bash
npx playwright test tests/example.spec.ts
```

Run tests in specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📊 Reports

View test report:
```bash
npm run report
```

## 🛠️ Configuration

### Playwright Configuration (`playwright.config.ts`)

- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: Configure in `use.baseURL`
- **Screenshots**: Captured on failure
- **Videos**: Recorded on first retry
- **Traces**: Captured on first retry
- **Parallel execution**: Enabled by default

### TypeScript Configuration (`tsconfig.json`)

- Target: ESNext
- Module: CommonJS
- Strict mode enabled
- Source maps enabled

## 📝 Writing Tests

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Using Page Objects

```typescript
import { test, expect } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage';

test('test with page object', async ({ page }) => {
  const examplePage = new ExamplePage(page);
  await examplePage.navigate('https://example.com');
  const title = await examplePage.getTitle();
  expect(title).toContain('Example');
});
```

## 🔧 Useful Commands

Generate tests with Codegen:
```bash
npm run codegen
```

Show trace viewer:
```bash
npx playwright show-trace trace.zip
```

List all available projects:
```bash
npx playwright test --list
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

Feel free to contribute to this project by submitting pull requests or reporting issues.

## 📄 License

ISC
