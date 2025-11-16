import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';    
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { TestDataGenerator, UserData } from '../utils/testDataGenerator';

test.describe('Checkout Tests - Test Cases 14-16, 23-24', () => {
  let homePage: HomePage;
  let signupLoginPage: SignupLoginPage;
  let signupPage: SignupPage;
  let accountPage: AccountPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let userData: UserData;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountPage = new AccountPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    userData = TestDataGenerator.generateUserData();
  });

  test('Test Case 14: Place Order - Register while Checkout @tc14', async ({ page }) => {
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

    // 6. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();

    // 7. Click 'Register / Login' button
    await checkoutPage.clickRegisterLogin();

    // 8. Fill all details in Signup and create account
    await signupLoginPage.signup(userData.name, userData.email);
    await expect(await signupPage.isAccountInfoVisible()).toBeTruthy();

    await signupPage.completeRegistration(
      userData.title,
      userData.password,
      userData.day,
      userData.month,
      userData.year,
      userData.firstName,
      userData.lastName,
      userData.company,
      userData.address1,
      userData.address2,
      userData.country,
      userData.state,
      userData.city,
      userData.zipcode,
      userData.mobileNumber
    );

    // 9. Verify 'ACCOUNT CREATED!' is visible
    await expect(await accountPage.isAccountCreatedVisible()).toBeTruthy();

    // 10. Click 'Continue' button
    await accountPage.clickContinue();

    // 11. Verify 'Logged in as username' at top
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 12. Click 'Cart' button
    await cartPage.clickCartButton();

    // 13. Click 'Proceed To Checkout' button
    await cartPage.clickProceedToCheckout();

    // 14. Verify Address Details and Review Your Order
    await expect(await checkoutPage.isAddressDetailsVisible()).toBeTruthy();

    // 15. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterComment('This is a test order');
    await checkoutPage.clickPlaceOrder();

    // 16. Enter payment details
    await checkoutPage.fillPaymentDetails(
      'Test User',
      '4242424242424242',
      '123',
      '12',
      '2025'
    );

    // 17. Click 'Pay and Confirm Order' button
    await checkoutPage.clickPayAndConfirm();

    // 18. Verify success message
    await expect(await checkoutPage.isOrderSuccessMessageVisible()).toBeTruthy();

    // 19. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 20. Verify 'ACCOUNT DELETED!' is visible
    await expect(await accountPage.isAccountDeletedVisible()).toBeTruthy();

    // 21. Click 'Continue' button
    await accountPage.clickContinue();
  });

  test('Test Case 15: Place Order - Register before Checkout @tc15', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click 'Signup / Login' button
    await homePage.clickSignupLogin();
    await page.waitForLoadState('domcontentloaded');

    // 4. Fill all details in Signup and create account
    await signupLoginPage.signup(userData.name, userData.email);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2:has-text("Enter Account Information")', { state: 'visible', timeout: 10000 });
    await expect(await signupPage.isAccountInfoVisible()).toBeTruthy();

    await signupPage.completeRegistration(
      userData.title,
      userData.password,
      userData.day,
      userData.month,
      userData.year,
      userData.firstName,
      userData.lastName,
      userData.company,
      userData.address1,
      userData.address2,
      userData.country,
      userData.state,
      userData.city,
      userData.zipcode,
      userData.mobileNumber
    );

    // 5. Verify 'ACCOUNT CREATED!' is visible
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2[data-qa="account-created"]', { state: 'visible', timeout: 10000 });
    await expect(await accountPage.isAccountCreatedVisible()).toBeTruthy();

    // 6. Click 'Continue' button
    await accountPage.clickContinue();
    await page.waitForLoadState('domcontentloaded');

    // 7. Verify 'Logged in as username' at top
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 8. Add products to cart
    await productsPage.clickProductsButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.features_items', { state: 'visible', timeout: 10000 });
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // 9. Click 'Cart' button
    await cartPage.clickCartButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#cart_info_table', { state: 'visible', timeout: 10000 });

    // 10. Verify that cart page is displayed
    await expect(await cartPage.isCartPageVisible()).toBeTruthy();

    // 11. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#address_delivery', { state: 'visible', timeout: 10000 });

    // 12. Verify Address Details and Review Your Order
    await expect(await checkoutPage.isAddressDetailsVisible()).toBeTruthy();

    // 13. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterComment('This is a test order');
    await checkoutPage.clickPlaceOrder();

    // 14. Enter payment details
    await checkoutPage.fillPaymentDetails(
      'Test User',
      '4242424242424242',
      '123',
      '12',
      '2025'
    );

    // 15. Click 'Pay and Confirm Order' button
    await checkoutPage.clickPayAndConfirm();

    // 16. Verify success message
    await expect(await checkoutPage.isOrderSuccessMessageVisible()).toBeTruthy();

    // 17. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 18. Verify 'ACCOUNT DELETED!' is visible
    await expect(await accountPage.isAccountDeletedVisible()).toBeTruthy();

    // 19. Click 'Continue' button
    await accountPage.clickContinue();
  });

  test('Test Case 16: Place Order - Login before Checkout @tc16', async ({ page }) => {
    // Note: This test requires a pre-existing account
    // For demo purposes, we'll create an account first, then use it to login

    // Setup: Create account first
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');
    await homePage.clickSignupLogin();
    await page.waitForLoadState('domcontentloaded');
    await signupLoginPage.signup(userData.name, userData.email);
    await page.waitForLoadState('domcontentloaded');
    await signupPage.completeRegistration(
      userData.title,
      userData.password,
      userData.day,
      userData.month,
      userData.year,
      userData.firstName,
      userData.lastName,
      userData.company,
      userData.address1,
      userData.address2,
      userData.country,
      userData.state,
      userData.city,
      userData.zipcode,
      userData.mobileNumber
    );
    await page.waitForLoadState('domcontentloaded');
    await accountPage.clickContinue();
    await page.waitForLoadState('domcontentloaded');
    await homePage.clickLogout();
    await page.waitForLoadState('domcontentloaded');

    // Actual Test Case 16 starts here
    // 1. Navigate to home page
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 4. Fill email, password and click 'Login' button
    await signupLoginPage.login(userData.email, userData.password);
    await page.waitForLoadState('domcontentloaded');

    // 5. Verify 'Logged in as username' at top
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 6. Add products to cart
    await productsPage.clickProductsButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.features_items', { state: 'visible', timeout: 10000 });
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // 7. Click 'Cart' button
    await cartPage.clickCartButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#cart_info_table', { state: 'visible', timeout: 10000 });

    // 8. Verify that cart page is displayed
    await expect(await cartPage.isCartPageVisible()).toBeTruthy();

    // 9. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#address_delivery', { state: 'visible', timeout: 10000 });

    // 10. Verify Address Details and Review Your Order
    await expect(await checkoutPage.isAddressDetailsVisible()).toBeTruthy();

    // 11. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterComment('This is a test order');
    await checkoutPage.clickPlaceOrder();

    // 12. Enter payment details
    await checkoutPage.fillPaymentDetails(
      'Test User',
      '4242424242424242',
      '123',
      '12',
      '2025'
    );

    // 13. Click 'Pay and Confirm Order' button
    await checkoutPage.clickPayAndConfirm();

    // 14. Verify success message
    await expect(await checkoutPage.isOrderSuccessMessageVisible()).toBeTruthy();

    // 15. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 16. Verify 'ACCOUNT DELETED!' is visible
    await expect(await accountPage.isAccountDeletedVisible()).toBeTruthy();

    // 17. Click 'Continue' button
    await accountPage.clickContinue();
  });

  test('Test Case 23: Verify address details in checkout page @tc23', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click 'Signup / Login' button
    await homePage.clickSignupLogin();
    await page.waitForLoadState('domcontentloaded');

    // 4. Fill all details in Signup and create account
    await signupLoginPage.signup(userData.name, userData.email);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2:has-text("Enter Account Information")', { state: 'visible', timeout: 10000 });
    await expect(await signupPage.isAccountInfoVisible()).toBeTruthy();

    await signupPage.completeRegistration(
      userData.title,
      userData.password,
      userData.day,
      userData.month,
      userData.year,
      userData.firstName,
      userData.lastName,
      userData.company,
      userData.address1,
      userData.address2,
      userData.country,
      userData.state,
      userData.city,
      userData.zipcode,
      userData.mobileNumber
    );

    // 5. Verify 'ACCOUNT CREATED!' is visible and click 'Continue'
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2[data-qa="account-created"]', { state: 'visible', timeout: 10000 });
    await expect(await accountPage.isAccountCreatedVisible()).toBeTruthy();
    await accountPage.clickContinue();
    await page.waitForLoadState('domcontentloaded');

    // 6. Verify 'Logged in as username' at top
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 7. Add products to cart
    await productsPage.clickProductsButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.features_items', { state: 'visible', timeout: 10000 });
    await productsPage.hoverAndAddToCart(0);
    await productsPage.clickContinueShopping();

    // 8. Click 'Cart' button
    await cartPage.clickCartButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#cart_info_table', { state: 'visible', timeout: 10000 });

    // 9. Verify that cart page is displayed
    await expect(await cartPage.isCartPageVisible()).toBeTruthy();

    // 10. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();

    // 11. Verify that the delivery address is same address filled at the time registration of account
    const deliveryAddress = await checkoutPage.getDeliveryAddress();
    expect(deliveryAddress).toContain(userData.firstName);
    expect(deliveryAddress).toContain(userData.lastName);
    expect(deliveryAddress).toContain(userData.address1);
    expect(deliveryAddress).toContain(userData.city);
    expect(deliveryAddress).toContain(userData.state);
    expect(deliveryAddress).toContain(userData.zipcode);

    // 12. Verify that the billing address is same address filled at the time registration of account
    const billingAddress = await checkoutPage.getBillingAddress();
    expect(billingAddress).toContain(userData.firstName);
    expect(billingAddress).toContain(userData.lastName);
    expect(billingAddress).toContain(userData.address1);
    expect(billingAddress).toContain(userData.city);
    expect(billingAddress).toContain(userData.state);
    expect(billingAddress).toContain(userData.zipcode);

    // Cleanup
    await homePage.clickDeleteAccount();
    await accountPage.clickContinue();
  });

  test('Test Case 24: Download Invoice after purchase order @tc24', async ({ page }) => {
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

    // 6. Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();
    await page.waitForLoadState('domcontentloaded');

    // 7. Click 'Register / Login' button
    await checkoutPage.clickRegisterLogin();
    await page.waitForLoadState('domcontentloaded');

    // 8. Fill all details in Signup and create account
    await signupLoginPage.signup(userData.name, userData.email);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2:has-text("Enter Account Information")', { state: 'visible', timeout: 15000 });
    await signupPage.completeRegistration(
      userData.title,
      userData.password,
      userData.day,
      userData.month,
      userData.year,
      userData.firstName,
      userData.lastName,
      userData.company,
      userData.address1,
      userData.address2,
      userData.country,
      userData.state,
      userData.city,
      userData.zipcode,
      userData.mobileNumber
    );

    // 9. Verify 'ACCOUNT CREATED!' and click 'Continue'
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2[data-qa="account-created"]', { state: 'visible', timeout: 10000 });
    await expect(await accountPage.isAccountCreatedVisible()).toBeTruthy();
    await accountPage.clickContinue();
    await page.waitForLoadState('domcontentloaded');

    // 10. Verify 'Logged in as username' at top
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 11. Click 'Cart' button
    await cartPage.clickCartButton();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#cart_info_table', { state: 'visible', timeout: 10000 });

    // 12. Click 'Proceed To Checkout' button
    await cartPage.clickProceedToCheckout();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#address_delivery', { state: 'visible', timeout: 10000 });

    // 13. Verify Address Details and Review Your Order
    await expect(await checkoutPage.isAddressDetailsVisible()).toBeTruthy();

    // 14. Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterComment('This is a test order for invoice download');
    await checkoutPage.clickPlaceOrder();
    await page.waitForLoadState('domcontentloaded');

    // 15. Enter payment details
    await checkoutPage.fillPaymentDetails(
      'Test User',
      '4242424242424242',
      '123',
      '12',
      '2025'
    );

    // 16. Click 'Pay and Confirm Order' button
    await checkoutPage.clickPayAndConfirm();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('p:has-text("Congratulations")', { state: 'visible', timeout: 10000 });

    // 17. Verify success message 'Your order has been placed successfully!'
    await expect(await checkoutPage.isOrderSuccessMessageVisible()).toBeTruthy();

    // 18. Click 'Download Invoice' button and verify invoice is downloaded successfully
    const downloadPromise = page.waitForEvent('download');
    await checkoutPage.clickDownloadInvoice();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('invoice');

    // 19. Click 'Continue' button
    await checkoutPage.clickContinue();
    await page.waitForLoadState('domcontentloaded');

    // 20. Click 'Delete Account' button
    await homePage.clickDeleteAccount();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2[data-qa="account-deleted"]', { state: 'visible', timeout: 10000 });

    // 21. Verify 'ACCOUNT DELETED!' is visible and click 'Continue'
    await expect(await accountPage.isAccountDeletedVisible()).toBeTruthy();
    await accountPage.clickContinue();
  });
});
