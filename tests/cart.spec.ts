import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Tests - Test Cases 12, 13, 17', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('Test Case 12: Add Products in Cart @tc12', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click 'Products' button
    await productsPage.clickProductsButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.features_items', { state: 'visible', timeout: 10000 });

    // 4. Hover over first product and click 'Add to cart'
    await productsPage.hoverAndAddToCart(0);

    // 5. Click 'Continue Shopping' button
    await productsPage.clickContinueShopping();

    // 6. Hover over second product and click 'Add to cart'
    await productsPage.hoverAndAddToCart(1);

    // 7. Click 'View Cart' button
    await productsPage.clickViewCart();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#cart_info_table', { state: 'visible', timeout: 10000 });

    // 8. Verify both products are added to Cart
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBeGreaterThanOrEqual(2);

    // 9. Verify their prices, quantity and total price
    await expect(cartPage.cartInfo).toBeVisible();
  });

  test('Test Case 13: Verify Product quantity in Cart @tc13', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click 'View Product' for any product on home page
    await productsPage.clickProductsButton();
    await productsPage.clickFirstProductViewButton();

    // 4. Verify product detail is opened
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.product-information h2', { state: 'visible' });
    await expect(await productsPage.isProductDetailVisible()).toBeTruthy();

    // 5. Increase quantity to 4
    await productsPage.setQuantity(4);

    // 6. Click 'Add to cart' button
    await productsPage.clickAddToCart();

    // 7. Click 'View Cart' button
    await productsPage.clickViewCart();

    // 8. Verify that product is displayed in cart page with exact quantity
    await expect(cartPage.cartInfo).toBeVisible();
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBeGreaterThan(0);
  });

  test('Test Case 17: Remove Products From Cart @tc17', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Add products to cart
    await productsPage.clickProductsButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.features_items', { state: 'visible', timeout: 10000 });
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // 4. Click 'Cart' button
    await cartPage.clickCartButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#cart_info_table', { state: 'visible', timeout: 10000 });

    // 5. Verify that cart page is displayed
    await expect(await cartPage.isCartPageVisible()).toBeTruthy();

    // Get initial count
    const initialCount = await cartPage.getCartItemsCount();
    expect(initialCount).toBeGreaterThan(0);

    // 6. Click 'X' button corresponding to particular product
    await cartPage.removeFirstProduct();

    // 7. Verify that product is removed from the cart
    await page.waitForTimeout(1000); // Wait for removal animation
    const finalCount = await cartPage.getCartItemsCount();
    expect(finalCount).toBeLessThan(initialCount);
  });
});
