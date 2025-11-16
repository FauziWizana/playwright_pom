import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products Tests - Test Cases 8 & 9', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
  });

  test('Test Case 8: Verify All Products and product detail page @tc8', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Products' button
    await productsPage.clickProductsButton();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('h2.title:has-text("All Products")', { state: 'visible', timeout: 10000 });
    await expect(await productsPage.isAllProductsPageVisible()).toBeTruthy();
    const currentUrl = await productsPage.getCurrentUrl();
    expect(currentUrl).toContain('/products');

    // 5. The products list is visible
    await expect(await productsPage.isProductsListVisible()).toBeTruthy();

    // 6. Click on 'View Product' of first product
    await productsPage.clickFirstProductViewButton();

    // 7. User is landed to product detail page
    // 8. Verify that detail is visible: product name, category, price, availability, condition, brand
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.product-information h2', { state: 'visible', timeout: 10000 });
    await expect(await productsPage.isProductDetailVisible()).toBeTruthy();
  });

  test('Test Case 9: Search Product @tc9', async ({ page }) => {
    // 1. Launch browser and navigate to url
    await homePage.navigateToHome();

    // 2. Verify that home page is visible successfully
    await expect(await homePage.isHomePageVisible()).toBeTruthy();

    // 3. Click on 'Products' button
    await productsPage.clickProductsButton();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(await productsPage.isAllProductsPageVisible()).toBeTruthy();

    // 5. Enter product name in search input and click search button
    await productsPage.searchProduct('Dress');

    // 6. Verify 'SEARCHED PRODUCTS' is visible
    await expect(await productsPage.isSearchedProductsHeadingVisible()).toBeTruthy();

    // 7. Verify all the products related to search are visible
    await expect(await productsPage.areSearchResultProductsVisible()).toBeTruthy();
    const resultsCount = await productsPage.getSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  });
});
