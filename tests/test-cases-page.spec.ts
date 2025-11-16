import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TestCasesPage } from '../pages/TestCasesPage';

test.describe('Test Cases Page - Test Case 7', () => {
  let homePage: HomePage;
  let testCasesPage: TestCasesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    testCasesPage = new TestCasesPage(page);
  });

  test('Test Case 7: Verify Test Cases Page @tc7', async () => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Test Cases' button
    await testCasesPage.clickTestCasesButton();

    // 4. Verify user is navigated to test cases page successfully
    await expect(await testCasesPage.isTestCasesPageVisible()).toBeTruthy();
    const currentUrl = await testCasesPage.getCurrentUrl();
    expect(currentUrl).toContain('/test_cases');
  });
});
