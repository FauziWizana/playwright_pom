import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  readonly contactUsButton: Locator;
  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly fileUploadInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.contactUsButton = page.locator('a[href="/contact_us"]');
    this.getInTouchHeading = page.locator('h2', { hasText: 'Get In Touch' });
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.subjectInput = page.locator('input[name="subject"]');
    this.messageTextarea = page.locator('textarea[name="message"]');
    this.fileUploadInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[name="submit"]');
    this.successMessage = page.locator('div.status.alert.alert-success');
    this.homeButton = page.locator('#form-section a.btn', { hasText: 'Home' });
  }

  async clickContactUsButton() {
    await this.contactUsButton.click();
  }

  async isGetInTouchVisible(): Promise<boolean> {
    return await this.getInTouchHeading.isVisible();
  }

  async fillContactForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageTextarea.fill(message);
  }

  async uploadFile(filePath: string) {
    await this.fileUploadInput.setInputFiles(filePath);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async clickSubmitAndAcceptAlert() {
    // Set up dialog handler BEFORE clicking submit
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    
    // Click submit button which will trigger the confirm dialog
    await this.submitButton.click();
    
    // Wait a bit for the page to process
    await this.page.waitForTimeout(3000);
  }

  async handleSubmitAlert() {
    // Handle the browser alert that appears after clicking submit
    this.page.on('dialog', async dialog => {
      expect(dialog.type()).toContain('alert');
      await dialog.accept();
    });
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }

  async getSuccessMessageText(): Promise<string> {
    return await this.successMessage.textContent() || '';
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }
}