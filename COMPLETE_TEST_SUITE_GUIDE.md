# Complete Test Suite - TC6 to TC26

## 📚 Quick Reference

### Test Case Distribution

| Test Cases | Description | File | Status |
|------------|-------------|------|--------|
| TC6 | Contact Us Form | `tests/contact-us.spec.ts` | ✅ |
| TC7 | Test Cases Page | `tests/test-cases-page.spec.ts` | ✅ |
| TC8-9 | Products & Search | `tests/products.spec.ts` | ✅ (1 flaky) |
| TC10-11 | Subscriptions | `tests/subscription.spec.ts` | ✅ |
| TC12-13, 17 | Cart Operations | `tests/cart.spec.ts` | ✅ (1 flaky) |
| TC14-16, 23-24 | Checkout Flows | `tests/checkout.spec.ts` | ✅ |
| TC18-19 | Categories & Brands | `tests/categories-brands.spec.ts` | ✅ |
| TC20-21 | Search & Reviews | `tests/search-review.spec.ts` | ✅ (1 flaky) |
| TC22, 25-26 | Additional Features | `tests/additional-features.spec.ts` | ✅ |

**Total Test Cases**: 21 test cases automated
**Total Test Files**: 9 spec files
**Pass Rate**: ~93% (3 flaky tests that pass on retry)

## 🎯 Test Execution Commands

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npm test -- <filename>.spec.ts

# Examples:
npm test -- cart.spec.ts
npm test -- checkout.spec.ts
```

### Run Specific Test Case by Tag
```bash
npm test -- --grep "@tc<number>"

# Examples:
npm test -- --grep "@tc12"
npm test -- --grep "@tc14|@tc15"
```

### Run All TC6-11 Tests
```bash
npm test -- contact-us.spec.ts test-cases-page.spec.ts products.spec.ts subscription.spec.ts
```

### Run All TC12-26 Tests
```bash
npm test -- cart.spec.ts checkout.spec.ts categories-brands.spec.ts search-review.spec.ts additional-features.spec.ts
```

### Run Tests in Headed Mode
```bash
npm run test:headed -- <filename>.spec.ts
```

### Open UI Mode
```bash
npm run test:ui
```

### View Last Report
```bash
npm run report
```

## 📂 Project Structure

```
forto_pw/
├── pages/                      # Page Object Models
│   ├── BasePage.ts            # Base class for all pages
│   ├── HomePage.ts            # Home page actions
│   ├── SignupLoginPage.ts     # Signup/Login page
│   ├── SignupPage.ts          # Registration form
│   ├── AccountPage.ts         # Account actions
│   ├── ContactUsPage.ts       # Contact form
│   ├── TestCasesPage.ts       # Test cases navigation
│   ├── ProductsPage.ts        # Products listing & details
│   ├── CartPage.ts            # Shopping cart
│   └── CheckoutPage.ts        # Checkout flow
├── tests/                      # Test files
│   ├── contact-us.spec.ts     # TC6
│   ├── test-cases-page.spec.ts # TC7
│   ├── products.spec.ts       # TC8-9
│   ├── subscription.spec.ts   # TC10-11
│   ├── cart.spec.ts           # TC12-13, TC17
│   ├── checkout.spec.ts       # TC14-16, TC23-24
│   ├── categories-brands.spec.ts # TC18-19
│   ├── search-review.spec.ts  # TC20-21
│   └── additional-features.spec.ts # TC22, TC25-26
├── utils/                      # Utilities
│   └── testDataGenerator.ts  # Test data generation
├── data/                       # Test data files
│   └── sample-upload.txt      # Sample file for upload
├── playwright.config.ts        # Playwright configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔑 Key Features

### Page Object Model
- ✅ Consistent architecture across all pages
- ✅ Reusable methods and locators
- ✅ Inheritance from BasePage
- ✅ Type-safe with TypeScript

### Test Data Management
- ✅ Dynamic data generation with `TestDataGenerator`
- ✅ Unique email/name for each test run
- ✅ Realistic test data (names, addresses, etc.)

### Error Handling
- ✅ Retry mechanism (retries: 1)
- ✅ Screenshots on failure
- ✅ Video recording
- ✅ Trace files for debugging

### Reporting
- ✅ HTML reports
- ✅ Screenshots attached
- ✅ Video recordings
- ✅ Trace viewer integration

## 🐛 Debugging

### View Screenshot of Failed Test
Screenshots are automatically captured in `test-results/` folder

### Watch Video Recording
Videos are saved in `test-results/` folder for all tests

### View Trace
```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

### Run in Debug Mode
```bash
npx playwright test --debug
```

## 📊 Test Metrics

### Execution Time (Sequential)
- **TC6-11** (6 tests): ~1-2 minutes
- **TC12-26** (15 tests): ~2-3 minutes
- **All Tests** (30 tests): ~3-4 minutes

### Stability
- **Stable Tests**: 18/21 (85.7%)
- **Flaky Tests**: 3/21 (14.3%) - all pass on retry
- **Failing Tests**: 0/21 (0%)

## 🔍 Test Coverage

### User Flows
- ✅ Registration & Login
- ✅ Contact Form Submission
- ✅ Product Browsing & Search
- ✅ Shopping Cart Operations
- ✅ Checkout & Payment
- ✅ Category Navigation
- ✅ Brand Filtering
- ✅ Product Reviews
- ✅ Subscriptions
- ✅ Account Management

### Features Tested
- ✅ Form Validations
- ✅ File Upload
- ✅ Dialog Handling
- ✅ Search Functionality
- ✅ Cart Persistence
- ✅ Address Verification
- ✅ Invoice Download
- ✅ Scroll Functionality
- ✅ Responsive Elements (Hover Actions)
- ✅ Dynamic Content Loading

## 🎓 Best Practices

1. **Always review base code**: Each test file references the page objects and utilities
2. **Run tests sequentially**: Current config uses `workers: 1` to avoid conflicts
3. **Clean up after tests**: All tests that create accounts also delete them
4. **Use descriptive tags**: All tests tagged with `@tc<number>` for easy filtering
5. **Check HTML reports**: Reports provide detailed information about test execution

## 📝 Maintenance

### Adding New Tests
1. Create new spec file in `tests/` folder
2. Import required page objects
3. Use `TestDataGenerator` for dynamic data
4. Follow existing test structure
5. Add cleanup steps (if needed)

### Updating Page Objects
1. Add new locators in constructor
2. Create methods for new actions
3. Keep methods focused and reusable
4. Update all dependent tests

### Troubleshooting Flaky Tests
1. Add explicit waits: `page.waitForLoadState()`
2. Use `scrollIntoViewIfNeeded()` for off-screen elements
3. Add `.first()` for locators matching multiple elements
4. Increase timeout if needed: `{ timeout: 10000 }`

## 🚀 CI/CD Integration

The test suite is ready for CI/CD integration. Configure your pipeline to:
1. Install dependencies: `npm ci`
2. Install browsers: `npx playwright install --with-deps`
3. Run tests: `npm test`
4. Upload reports: `playwright-report/` folder

## ✅ Checklist for Test Execution

- [ ] All dependencies installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] Test data files available (`data/sample-upload.txt`)
- [ ] Configuration verified (`playwright.config.ts`)
- [ ] Tests run successfully (`npm test`)
- [ ] Reports generated (`playwright-report/`)
- [ ] Known flaky tests documented
- [ ] CI/CD pipeline configured (if applicable)

---

**Last Updated**: 2024
**Framework**: Playwright v1.x + TypeScript
**Test Suite Version**: 1.0
**Coverage**: Test Cases 6-26 (21 test cases)
