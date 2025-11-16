import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { SignupPage } from '../pages/SignupPage';
import { AccountPage } from '../pages/AccountPage';
import { TestDataGenerator, UserData } from '../utils/testDataGenerator';

test.describe('Authentication Tests - Test Cases 1-5', () => {
  let homePage: HomePage;
  let signupLoginPage: SignupLoginPage;
  let signupPage: SignupPage;
  let accountPage: AccountPage;
  let userData: UserData;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupPage = new SignupPage(page);
    accountPage = new AccountPage(page);
    userData = TestDataGenerator.generateUserData();
  });

  test('Test Case 1: Register User @tc1', async () => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 4. Verify 'New User Signup!' is visible
    await expect(await signupLoginPage.isNewUserSignupVisible()).toBeTruthy();

    // 5. Enter name and email address
    // 6. Click 'Signup' button
    await signupLoginPage.signup(userData.name, userData.email);

    // 7. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(await signupPage.isAccountInfoVisible()).toBeTruthy();

    // 8-11. Fill details and complete registration
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

    // 12. Verify that 'ACCOUNT CREATED!' is visible
    await expect(await accountPage.isAccountCreatedVisible()).toBeTruthy();

    // 13. Click 'Continue' button
    await accountPage.clickContinue();

    // 14. Verify that 'Logged in as username' is visible
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 15. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 16. Verify that 'ACCOUNT DELETED!' is visible
    await expect(await accountPage.isAccountDeletedVisible()).toBeTruthy();

    // 17. Click 'Continue' button
    await accountPage.clickContinue();
  });

  test('Test Case 2: Login User with correct email and password @tc2', async () => {
    // First, create a user account
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
    await signupLoginPage.signup(userData.name, userData.email);
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
    await accountPage.clickContinue();
    
    // Logout to test login
    await homePage.clickLogout();

    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 4. Verify 'Login to your account' is visible
    await expect(await signupLoginPage.isLoginToAccountVisible()).toBeTruthy();

    // 5. Enter correct email address and password
    // 6. Click 'login' button
    await signupLoginPage.login(userData.email, userData.password);

    // 7. Verify that 'Logged in as username' is visible
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 8. Click 'Delete Account' button
    await homePage.clickDeleteAccount();

    // 9. Verify that 'ACCOUNT DELETED!' is visible
    await expect(await accountPage.isAccountDeletedVisible()).toBeTruthy();
  });

  test('Test Case 3: Login User with incorrect email and password @tc3', async () => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 4. Verify 'Login to your account' is visible
    await expect(await signupLoginPage.isLoginToAccountVisible()).toBeTruthy();

    // 5. Enter incorrect email address and password
    const invalidCredentials = TestDataGenerator.generateInvalidCredentials();
    
    // 6. Click 'login' button
    await signupLoginPage.login(invalidCredentials.email, invalidCredentials.password);

    // 7. Verify error 'Your email or password is incorrect!' is visible
    await expect(await signupLoginPage.isLoginErrorVisible()).toBeTruthy();
    const errorMessage = await signupLoginPage.getLoginErrorMessage();
    expect(errorMessage).toContain('Your email or password is incorrect!');
  });

  test('Test Case 4: Logout User @tc4', async () => {
    // First, create a user account
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
    await signupLoginPage.signup(userData.name, userData.email);
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
    await accountPage.clickContinue();
    
    // Logout to test login flow
    await homePage.clickLogout();

    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 4. Verify 'Login to your account' is visible
    await expect(await signupLoginPage.isLoginToAccountVisible()).toBeTruthy();

    // 5. Enter correct email address and password
    // 6. Click 'login' button
    await signupLoginPage.login(userData.email, userData.password);

    // 7. Verify that 'Logged in as username' is visible
    await expect(await homePage.isLoggedInAsVisible(userData.name)).toBeTruthy();

    // 8. Click 'Logout' button
    await homePage.clickLogout();

    // 9. Verify that user is navigated to login page
    await expect(await signupLoginPage.isLoginToAccountVisible()).toBeTruthy();

    // Cleanup - login and delete account
    await signupLoginPage.login(userData.email, userData.password);
    await homePage.clickDeleteAccount();
  });

  test('Test Case 5: Register User with existing email @tc5', async () => {
    // First, create a user account
    await homePage.navigateToHome();
    await homePage.clickSignupLogin();
    await signupLoginPage.signup(userData.name, userData.email);
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
    await accountPage.clickContinue();
    await homePage.clickLogout();

    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // 4. Verify 'New User Signup!' is visible
    await expect(await signupLoginPage.isNewUserSignupVisible()).toBeTruthy();

    // 5. Enter name and already registered email address
    // 6. Click 'Signup' button
    await signupLoginPage.signup(userData.name, userData.email);

    // 7. Verify error 'Email Address already exist!' is visible
    await expect(await signupLoginPage.isSignupErrorVisible()).toBeTruthy();
    const errorMessage = await signupLoginPage.getSignupErrorMessage();
    expect(errorMessage).toContain('Email Address already exist!');

    // Cleanup - login and delete account
    await signupLoginPage.login(userData.email, userData.password);
    await homePage.clickDeleteAccount();
  });
});
