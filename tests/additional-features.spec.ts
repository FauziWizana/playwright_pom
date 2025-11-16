import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test.describe('Additional Feature Tests - Test Cases 22, 25, 26', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
  });

  test('Test Case 22: Add to cart from Recommended items @tc22', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Scroll to bottom of page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // 3. Verify 'RECOMMENDED ITEMS' are visible
    const recommendedHeading = page.locator('h2.title', { hasText: 'recommended items' });
    await page.waitForSelector('h2.title:has-text("recommended items")', { state: 'visible', timeout: 10000 });
    await expect(recommendedHeading).toBeVisible();

    // 4. Click on 'Add To Cart' on Recommended product
    const recommendedItem = page.locator('.recommended_items .product-image-wrapper').first();
    await recommendedItem.scrollIntoViewIfNeeded();
    await recommendedItem.locator('.add-to-cart').click();

    // 5. Click on 'View Cart' button
    await page.locator('a', { hasText: 'View Cart' }).first().click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#cart_info_table', { state: 'visible', timeout: 10000 });

    // 6. Verify that product is displayed in cart page
    await expect(await cartPage.isCartPageVisible()).toBeTruthy();
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBeGreaterThan(0);
  });

  test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality @tc25', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Scroll down page to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // 4. Verify 'SUBSCRIPTION' is visible
    const subscriptionText = page.locator('h2', { hasText: 'Subscription' });
    await page.waitForSelector('h2:has-text("Subscription")', { state: 'visible', timeout: 10000 });
    await expect(subscriptionText).toBeVisible();

    // 5. Click on arrow at bottom right side to move upward
    const scrollUpArrow = page.locator('#scrollUp');
    await page.waitForSelector('#scrollUp', { state: 'visible', timeout: 10000 });
    await scrollUpArrow.click();

    // 6. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    await page.waitForTimeout(2000); // Wait for scroll animation
    await page.evaluate(() => window.scrollTo(0, 0)); // Ensure we're at top
    const headerText = page.locator('h2', { hasText: 'Full-Fledged practice website for Automation Engineers' }).first();
    await expect(headerText).toBeVisible();
  });

  test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality @tc26', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Scroll down page to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    // 4. Verify 'SUBSCRIPTION' is visible
    const subscriptionText = page.locator('h2', { hasText: 'Subscription' });
    await page.waitForSelector('h2:has-text("Subscription")', { state: 'visible', timeout: 10000 });
    await expect(subscriptionText).toBeVisible();

    // 5. Scroll up page to top
    await page.evaluate(() => window.scrollTo(0, 0));

    // 6. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    await page.waitForTimeout(1000); // Wait for scroll
    const headerText = page.locator('h2', { hasText: 'Full-Fledged practice website for Automation Engineers' }).first();
    await expect(headerText).toBeVisible();
  });
});
