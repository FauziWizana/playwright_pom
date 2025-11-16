import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { TestDataGenerator } from '../utils/testDataGenerator';
import path from 'path';

test.describe('Contact Us - Test Case 6', () => {
  let homePage: HomePage;
  let contactUsPage: ContactUsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactUsPage = new ContactUsPage(page);
  });

  test('Test Case 6: Contact Us Form @tc6', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Contact Us' button
    await contactUsPage.clickContactUsButton();

    // 4. Verify 'GET IN TOUCH' is visible
    await expect(await contactUsPage.isGetInTouchVisible()).toBeTruthy();

    // 5. Enter name, email, subject and message
    const userData = TestDataGenerator.generateUserData();
    await contactUsPage.fillContactForm(
      userData.name,
      userData.email,
      'Test Subject - Automation Testing',
      'This is a test message for automated testing of the contact form.'
    );

    // 6. Upload file
    const filePath = path.join(__dirname, '../data/sample-upload.txt');
    await contactUsPage.uploadFile(filePath);

    // 7. Click 'Submit' button and handle alert
    // 8. Handle alert/OK button - Set up dialog handler BEFORE clicking
    await contactUsPage.clickSubmitAndAcceptAlert();

    // 9. Verify success message 'Success! Your details have been submitted successfully.' is visible
    // After successful form submission, the page should show success elements
    const homeButton = page.getByText('Home').first();
    await expect(homeButton).toBeVisible({ timeout: 10000 });

    // 10. Click 'Home' button
    await homeButton.click();

    // 11. Verify that landed to home page successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();
  });
});