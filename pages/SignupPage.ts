import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
  readonly accountInfoText: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    
    this.accountInfoText = page.locator('div.login-form h2.title').first();
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
  }

  async isAccountInfoVisible(): Promise<boolean> {
    return await this.accountInfoText.isVisible();
  }

  async selectTitle(title: 'Mr' | 'Mrs') {
    if (title === 'Mr') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }
  }

  async fillAccountInformation(password: string, day: string, month: string, year: string) {
    await this.passwordInput.fill(password);
    await this.daySelect.selectOption(day);
    await this.monthSelect.selectOption(month);
    await this.yearSelect.selectOption(year);
  }

  async selectNewsletter() {
    await this.newsletterCheckbox.check();
  }

  async selectSpecialOffers() {
    await this.offersCheckbox.check();
  }

  async fillAddressInformation(
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.address1Input.fill(address1);
    await this.address2Input.fill(address2);
    await this.countrySelect.selectOption(country);
    await this.stateInput.fill(state);
    await this.cityInput.fill(city);
    await this.zipcodeInput.fill(zipcode);
    await this.mobileNumberInput.fill(mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  async completeRegistration(
    title: 'Mr' | 'Mrs',
    password: string,
    day: string,
    month: string,
    year: string,
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string
  ) {
    await this.selectTitle(title);
    await this.fillAccountInformation(password, day, month, year);
    await this.selectNewsletter();
    await this.selectSpecialOffers();
    await this.fillAddressInformation(
      firstName,
      lastName,
      company,
      address1,
      address2,
      country,
      state,
      city,
      zipcode,
      mobileNumber
    );
    await this.clickCreateAccount();
  }
}
