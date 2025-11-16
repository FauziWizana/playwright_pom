import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TestCasesPage extends BasePage {
  readonly testCasesButton: Locator;
  readonly testCasesHeading: Locator;
  readonly testCasesPageContent: Locator;

  constructor(page: Page) {
    super(page);
    this.testCasesButton = page.locator('a[href="/test_cases"]').first();
    this.testCasesHeading = page.locator('h2.title.text-center', { hasText: 'Test Cases' });
    this.testCasesPageContent = page.locator('.panel-group').first();
  }

  async clickTestCasesButton() {
    await this.testCasesButton.click();
  }

  async isTestCasesPageVisible(): Promise<boolean> {
    return await this.testCasesHeading.isVisible() && await this.testCasesPageContent.isVisible();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}