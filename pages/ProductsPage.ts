import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly productsButton: Locator;
  readonly allProductsHeading: Locator;
  readonly productsList: Locator;
  readonly firstProductViewButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly searchResultProducts: Locator;

  // Product detail page elements
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productsButton = page.locator('a[href="/products"]').first();
    this.allProductsHeading = page.locator('h2.title.text-center', { hasText: 'All Products' });
    this.productsList = page.locator('.features_items');
    this.firstProductViewButton = page.locator('a[href="/product_details/1"]').first();
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.locator('h2.title.text-center', { hasText: 'Searched Products' });
    this.searchResultProducts = page.locator('.features_items .product-image-wrapper');

    // Product detail page elements
    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p', { hasText: 'Category:' });
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p', { hasText: 'Availability:' });
    this.productCondition = page.locator('.product-information p', { hasText: 'Condition:' });
    this.productBrand = page.locator('.product-information p', { hasText: 'Brand:' });
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button.btn.btn-default.cart');
    this.continueShoppingButton = page.locator('button', { hasText: 'Continue Shopping' });
    this.viewCartButton = page.locator('a', { hasText: 'View Cart' });
  }

  async clickProductsButton() {
    await this.productsButton.click();
  }

  async isAllProductsPageVisible(): Promise<boolean> {
    return await this.allProductsHeading.isVisible();
  }

  async isProductsListVisible(): Promise<boolean> {
    return await this.productsList.isVisible();
  }

  async clickFirstProductViewButton() {
    await this.firstProductViewButton.click();
  }

  async isProductDetailVisible(): Promise<boolean> {
    return await this.productName.isVisible() &&
           await this.productCategory.isVisible() &&
           await this.productPrice.isVisible() &&
           await this.productAvailability.isVisible() &&
           await this.productCondition.isVisible() &&
           await this.productBrand.isVisible();
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async isSearchedProductsHeadingVisible(): Promise<boolean> {
    return await this.searchedProductsHeading.isVisible();
  }

  async areSearchResultProductsVisible(): Promise<boolean> {
    const count = await this.searchResultProducts.count();
    return count > 0;
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.searchResultProducts.count();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async hoverAndAddToCart(productIndex: number) {
    const product = this.page.locator('.product-image-wrapper').nth(productIndex);
    await product.hover();
    await product.locator('.add-to-cart').first().click();
  }

  async clickContinueShopping() {
    // Wait for modal to appear before clicking
    await this.page.waitForSelector('button:has-text("Continue Shopping")', { state: 'visible', timeout: 5000 });
    await this.continueShoppingButton.click();
    // Wait for modal to disappear
    await this.page.waitForSelector('.modal-backdrop', { state: 'hidden', timeout: 5000 }).catch(() => {});
  }

  async clickViewCart() {
    await this.viewCartButton.click();
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async addProductToCart(productIndex: number) {
    await this.hoverAndAddToCart(productIndex);
  }
}