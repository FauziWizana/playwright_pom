import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { TestDataGenerator } from '../utils/testDataGenerator';

test.describe('Subscription Tests - Test Cases 10 & 11', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
  });

  test('Test Case 10: Verify Subscription in home page @tc10', async () => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Scroll down to footer
    await homePage.scrollToFooter();

    // 4. Verify text 'SUBSCRIPTION'
    await expect(await homePage.isSubscriptionHeadingVisible()).toBeTruthy();

    // 5. Enter email address in input and click arrow button
    const userData = TestDataGenerator.generateUserData();
    await homePage.subscribeWithEmail(userData.email);

    // 6. Verify success message 'You have been successfully subscribed!' is visible
    await expect(await homePage.isSubscriptionSuccessMessageVisible()).toBeTruthy();
    const successMessage = await homePage.getSubscriptionSuccessMessage();
    expect(successMessage).toContain('You have been successfully subscribed!');
  });

  test('Test Case 11: Verify Subscription in Cart page @tc11', async () => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click 'Cart' button
    await cartPage.clickCartButton();

    // 4. Scroll down to footer
    await cartPage.scrollToFooter();

    // 5. Verify text 'SUBSCRIPTION'
    await expect(await cartPage.isSubscriptionHeadingVisible()).toBeTruthy();

    // 6. Enter email address in input and click arrow button
    const userData = TestDataGenerator.generateUserData();
    await cartPage.subscribeWithEmail(userData.email);

    // 7. Verify success message 'You have been successfully subscribed!' is visible
    await expect(await cartPage.isSubscriptionSuccessMessageVisible()).toBeTruthy();
    const successMessage = await cartPage.getSubscriptionSuccessMessage();
    expect(successMessage).toContain('You have been successfully subscribed!');
  });
});
