import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly signupLoginButton: Locator;
  readonly logoutButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly loggedInAsText: Locator;
  readonly homePageContent: Locator;
  readonly subscriptionHeading: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscriptionSubmitButton: Locator;
  readonly subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginButton = page.locator('a[href="/login"]').first();
    this.logoutButton = page.locator('a[href="/logout"]');
    this.deleteAccountButton = page.locator('a[href="/delete_account"]');
    this.loggedInAsText = page.locator('li a').filter({ hasText: 'Logged in as' });
    this.homePageContent = page.locator('#slider');
    this.subscriptionHeading = page.locator('h2', { hasText: 'Subscription' });
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitButton = page.locator('#subscribe');
    this.subscriptionSuccessMessage = page.locator('.alert-success.alert');
  }

  async navigateToHome() {
    await this.navigate('https://automationexercise.com');
    await this.waitForPageLoad();
  }

  async clickSignupLogin() {
    await this.signupLoginButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountButton.click();
  }

  async isHomePageVisible(): Promise<boolean> {
    return await this.homePageContent.isVisible();
  }

  async isLoggedInAsVisible(username: string): Promise<boolean> {
    return await this.page.locator('li', { hasText: `Logged in as ${username}` }).isVisible();
  }

  async getLoggedInUsername(): Promise<string> {
    const text = await this.loggedInAsText.textContent();
    return text?.replace('Logged in as ', '').trim() || '';
  }

  async scrollToFooter() {
    await this.subscriptionHeading.scrollIntoViewIfNeeded();
  }

  async isSubscriptionHeadingVisible(): Promise<boolean> {
    return await this.subscriptionHeading.isVisible();
  }

  async subscribeWithEmail(email: string) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscriptionSubmitButton.click();
  }

  async isSubscriptionSuccessMessageVisible(): Promise<boolean> {
    return await this.subscriptionSuccessMessage.isVisible();
  }

  async getSubscriptionSuccessMessage(): Promise<string> {
    return await this.subscriptionSuccessMessage.textContent() || '';
  }
}
