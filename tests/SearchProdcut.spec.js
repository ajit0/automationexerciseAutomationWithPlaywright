// productSearch.spec.js
const { test, expect } = require('@playwright/test');
const { SearchProductPage } = require('../pages/searchProductPage');

test.describe('Product Search Tests', () => {
    let page;
    let productPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
   
        await page.goto('/');
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('should search for a product and verify results', async () => {
        productPage = new SearchProductPage(page);
        await expect(page).toHaveURL('/');
        await productPage.navigateToProductsPage();
        await expect(page).toHaveURL('/products');
       const allProductText= await productPage.verifyAllProductText();
         await expect(allProductText).toBeTruthy();
        await productPage.searchForProduct('Sleeves'); 
        await expect(page.locator('text=Searched Products')).toBeVisible(); 
        await productPage.verifyProductsName('Sleeves');
    });
});