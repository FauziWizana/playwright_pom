import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartButton: Locator;
  readonly cartInfo: Locator;
  readonly cartItems: Locator;
  readonly removeProductButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly subscriptionHeading: Locator;
  readonly subscriptionEmailInput: Locator;
  readonly subscriptionSubmitButton: Locator;
  readonly subscriptionSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartButton = page.locator('a[href="/view_cart"]').first();
    this.cartInfo = page.locator('#cart_info');
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.removeProductButton = page.locator('.cart_quantity_delete');
    this.continueShoppingButton = page.locator('button', { hasText: 'Continue Shopping' });
    this.proceedToCheckoutButton = page.locator('a.btn', { hasText: 'Proceed To Checkout' });
    this.subscriptionHeading = page.locator('h2', { hasText: 'Subscription' });
    this.subscriptionEmailInput = page.locator('#susbscribe_email');
    this.subscriptionSubmitButton = page.locator('#subscribe');
    this.subscriptionSuccessMessage = page.locator('.alert-success.alert');
  }

  async clickCartButton() {
    await this.cartButton.click();
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

  async isCartPageVisible(): Promise<boolean> {
    return await this.cartInfo.isVisible();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getProductPrice(productName: string): Promise<string> {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    return await row.locator('.cart_price p').textContent() || '';
  }

  async getProductQuantity(productName: string): Promise<string> {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    return await row.locator('.cart_quantity button').textContent() || '';
  }

  async getProductTotal(productName: string): Promise<string> {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    return await row.locator('.cart_total_price').textContent() || '';
  }

  async removeProduct(productName: string) {
    const row = this.page.locator(`tr:has-text("${productName}")`);
    await row.locator('.cart_quantity_delete').click();
  }

  async removeFirstProduct() {
    await this.removeProductButton.first().click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async isProductVisible(productName: string): Promise<boolean> {
    return await this.page.locator(`tr:has-text("${productName}")`).isVisible();
  }
}