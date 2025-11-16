import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Category and Brand Tests - Test Cases 18-19', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
  });

  test('Test Case 18: View Category Products @tc18', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that categories are visible on left side bar
    const categoriesVisible = await page.locator('.left-sidebar .panel-group').isVisible();
    expect(categoriesVisible).toBeTruthy();

    // 3. Click on 'Women' category
    await page.locator('a[href="#Women"]').click();

    // 4. Click on any category link under 'Women' category, for example: Dress
    await page.locator('a[href="/category_products/1"]').click();

    // 5. Verify that category page is displayed
    await expect(page).toHaveURL(/.*category_products/);

    // 6. Confirm text 'WOMEN - DRESS PRODUCTS' is visible
    const categoryTitle = page.locator('.features_items h2.title');
    await expect(categoryTitle).toBeVisible();
    const titleText = await categoryTitle.textContent();
    expect(titleText?.toUpperCase()).toContain('WOMEN');
    expect(titleText?.toUpperCase()).toContain('DRESS');

    // 7. On left side bar, click on any sub-category link of 'Men' category
    await page.locator('a[href="#Men"]').click();
    await page.locator('a[href="/category_products/3"]').click();

    // 8. Verify that user is navigated to that category page
    await expect(page).toHaveURL(/.*category_products\/3/);
    const menCategoryTitle = page.locator('.features_items h2.title');
    await expect(menCategoryTitle).toBeVisible();
    const menTitleText = await menCategoryTitle.textContent();
    expect(menTitleText?.toUpperCase()).toContain('MEN');
  });

  test('Test Case 19: View & Cart Brand Products @tc19', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Click on 'Products' button
    await productsPage.clickProductsButton();

    // 3. Verify that Brands are visible on left side bar
    const brandsVisible = await page.locator('.left-sidebar .brands-name').isVisible();
    expect(brandsVisible).toBeTruthy();

    // 4. Click on any brand name
    await page.locator('a[href="/brand_products/Polo"]').first().click();

    // 5. Verify that user is navigated to brand page and brand products are displayed
    await expect(page).toHaveURL(/.*brand_products/);
    const brandTitle = page.locator('.features_items h2.title');
    await expect(brandTitle).toBeVisible();
    const titleText = await brandTitle.textContent();
    expect(titleText?.toUpperCase()).toContain('POLO');

    // 6. On left side bar, click on any other brand link
    await page.locator('a[href="/brand_products/Madame"]').first().click();

    // 7. Verify that user is navigated to that brand page and can see products
    await expect(page).toHaveURL(/.*brand_products\/Madame/);
    const madameBrandTitle = page.locator('.features_items h2.title');
    await expect(madameBrandTitle).toBeVisible();
    const madameTitleText = await madameBrandTitle.textContent();
    expect(madameTitleText?.toUpperCase()).toContain('MADAME');
  });
});
