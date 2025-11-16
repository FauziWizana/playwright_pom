import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly accountCreatedText: Locator;
  readonly accountDeletedText: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    
    this.accountCreatedText = page.locator('h2[data-qa="account-created"]');
    this.accountDeletedText = page.locator('h2[data-qa="account-deleted"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async isAccountCreatedVisible(): Promise<boolean> {
    return await this.accountCreatedText.isVisible();
  }

  async isAccountDeletedVisible(): Promise<boolean> {
    return await this.accountDeletedText.isVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async getAccountCreatedText(): Promise<string> {
    return await this.accountCreatedText.textContent() || '';
  }

  async getAccountDeletedText(): Promise<string> {
    return await this.accountDeletedText.textContent() || '';
  }
}
