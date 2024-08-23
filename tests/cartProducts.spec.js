const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../pages/productPage');
const { CartPage } = require('../pages/cartPage');

test.describe('Cart Products', () => {
    let page;
    let homePage;
    let productsPage;
    let cartPage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await page.goto('/');
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('should add products to cart and verify details', async () => {
        test.slow();
        // Verify that home page is visible successfully
        await expect(page).toHaveURL('/');
        await page.route(/ads/, route => route.abort());
        // Click 'Products' button
        await productsPage.navigateToProducts();
        await page.route(/ads/, route => route.abort());
        await page.reload();
        await page.waitForTimeout(5000);
        // Hover over first product and click 'Add to cart'
        let firstProductPrice = await productsPage.addFirstProductToCart();
        await page.waitForTimeout(2000);
        // Hover over second product and click 'Add to cart'
       let secondProductPrice =  await productsPage.addSecondProductToCart();
       secondProductPrice =parseInt(secondProductPrice)
        await page.waitForTimeout(2000);
        // Click 'View Cart' button
        await cartPage.navigateToCart();
        await page.waitForTimeout(5000);
        // Verify both products are added to Cart
        await cartPage.verifyProductsInCart();
        await page.waitForTimeout(2000);
        // Verify their prices, quantity and total price
       let productDetails =  await cartPage.getProductDetails();
        console.log(productDetails)
        firstProductPrice =parseInt(firstProductPrice)
        expect(productDetails[0].price).toEqual(firstProductPrice)
        expect(productDetails[0].quantity).toEqual(1)
        let firstproductTotalprice  = parseInt(firstProductPrice) * 1;
        expect(productDetails[0].total).toEqual(firstproductTotalprice)
        expect(productDetails[1].price).toEqual(secondProductPrice)
        expect(productDetails[1].quantity).toEqual(1)
        let secondproductTotalprice = parseInt(secondProductPrice) * 1;
        expect(productDetails[1].total).toEqual(secondproductTotalprice);
    });
});