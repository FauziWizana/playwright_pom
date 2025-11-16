import { test, expect } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage';

test.describe('Page Object Model Example', () => {
  let examplePage: ExamplePage;

  test.beforeEach(async ({ page }) => {
    examplePage = new ExamplePage(page);
    // You can uncomment and modify the URL below for your actual tests
    // await examplePage.navigate('https://your-app-url.com');
  });

  test('example test using page object', async ({ page }) => {
    // This is a template test
    // Modify this according to your actual application
    await page.goto('https://playwright.dev');
    const title = await examplePage.getTitle();
    expect(title).toContain('Playwright');
  });
});
