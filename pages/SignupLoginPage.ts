import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupLoginPage extends BasePage {
  // Signup Section
  readonly newUserSignupText: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  // Login Section
  readonly loginToAccountText: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Signup locators
    this.newUserSignupText = page.locator('div.signup-form h2');
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupErrorMessage = page.locator('form[action="/signup"] p');

    // Login locators
    this.loginToAccountText = page.locator('div.login-form h2');
    this.loginEmailInput = page.locator('input[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginErrorMessage = page.locator('form[action="/login"] p');
  }

  async isNewUserSignupVisible(): Promise<boolean> {
    return await this.newUserSignupText.isVisible();
  }

  async isLoginToAccountVisible(): Promise<boolean> {
    return await this.loginToAccountText.isVisible();
  }

  async fillSignupForm(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async clickSignup() {
    await this.signupButton.click();
  }

  async fillLoginForm(email: string, password: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async getSignupErrorMessage(): Promise<string> {
    return await this.signupErrorMessage.textContent() || '';
  }

  async getLoginErrorMessage(): Promise<string> {
    return await this.loginErrorMessage.textContent() || '';
  }

  async isSignupErrorVisible(): Promise<boolean> {
    return await this.signupErrorMessage.isVisible();
  }

  async isLoginErrorVisible(): Promise<boolean> {
    return await this.loginErrorMessage.isVisible();
  }

  async signup(name: string, email: string) {
    await this.fillSignupForm(name, email);
    await this.clickSignup();
  }

  async login(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await this.clickLogin();
  }
}
