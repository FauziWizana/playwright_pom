import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly proceedToCheckoutButton: Locator;
  readonly registerLoginLink: Locator;
  readonly addressDeliverySection: Locator;
  readonly addressBillingSection: Locator;
  readonly commentTextarea: Locator;
  readonly placeOrderButton: Locator;
  
  // Payment page elements
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expirationMonthInput: Locator;
  readonly expirationYearInput: Locator;
  readonly payButton: Locator;
  
  // Order confirmation elements
  readonly orderSuccessMessage: Locator;
  readonly downloadInvoiceButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedToCheckoutButton = page.locator('a.btn', { hasText: 'Proceed To Checkout' });
    this.registerLoginLink = page.locator('a', { hasText: 'Register / Login' });
    this.addressDeliverySection = page.locator('#address_delivery');
    this.addressBillingSection = page.locator('#address_invoice');
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a[href="/payment"]');
    
    // Payment page elements
    this.nameOnCardInput = page.locator('input[name="name_on_card"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.cvcInput = page.locator('input[name="cvc"]');
    this.expirationMonthInput = page.locator('input[name="expiry_month"]');
    this.expirationYearInput = page.locator('input[name="expiry_year"]');
    this.payButton = page.locator('button#submit');
    
    // Order confirmation elements
    this.orderSuccessMessage = page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
    this.downloadInvoiceButton = page.locator('a.btn', { hasText: 'Download Invoice' });
    this.continueButton = page.locator('a.btn', { hasText: 'Continue' });
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async clickRegisterLogin() {
    await this.registerLoginLink.click();
  }

  async isAddressDetailsVisible(): Promise<boolean> {
    return await this.addressDeliverySection.isVisible() && await this.addressBillingSection.isVisible();
  }

  async enterComment(comment: string) {
    await this.commentTextarea.fill(comment);
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }

  async fillPaymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
    await this.nameOnCardInput.fill(nameOnCard);
    await this.cardNumberInput.fill(cardNumber);
    await this.cvcInput.fill(cvc);
    await this.expirationMonthInput.fill(expiryMonth);
    await this.expirationYearInput.fill(expiryYear);
  }

  async clickPayAndConfirm() {
    await this.payButton.click();
  }

  async isOrderSuccessMessageVisible(): Promise<boolean> {
    return await this.orderSuccessMessage.isVisible();
  }

  async getOrderSuccessMessage(): Promise<string> {
    return await this.orderSuccessMessage.textContent() || '';
  }

  async clickDownloadInvoice() {
    await this.downloadInvoiceButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async getDeliveryAddress(): Promise<string> {
    return await this.addressDeliverySection.textContent() || '';
  }

  async getBillingAddress(): Promise<string> {
    return await this.addressBillingSection.textContent() || '';
  }

  async verifyAddressContains(addressType: 'delivery' | 'billing', expectedText: string): Promise<boolean> {
    const section = addressType === 'delivery' ? this.addressDeliverySection : this.addressBillingSection;
    const text = await section.textContent() || '';
    return text.includes(expectedText);
  }
}
