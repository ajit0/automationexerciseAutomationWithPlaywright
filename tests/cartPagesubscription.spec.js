const { test, expect } = require('@playwright/test');
const { CartPageSubscription } = require('../pages/cartSubscription');
const registerUserData = require('../data/RegisterUserData')
const utils = require('../utils/utils')


test.describe('Cart Subscription', () => {
    let page;
    let cartPageSubscription;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        cartPageSubscription = new CartPageSubscription(page);
        await page.goto('/');
    });

    test.afterEach(async () => {
        await page.close();
    });

    test('should subscribe to the newsletter successfully', async () => {
        // Verify that home page is visible successfully
        await expect(page).toHaveURL('/');
        // Click 'Cart' button
        await cartPageSubscription.navigateToCart();
        // Scroll down to footer
        await page.waitForTimeout(3000);
        await cartPageSubscription.scrollToFooter();
        await page.waitForTimeout(3000);
        // Verify text 'SUBSCRIPTION'
        await expect(cartPageSubscription.subscriptionText).toBeVisible();
        // Enter email address in input and click arrow button
        const randomEmail = utils.generateRandomEmail();
        await cartPageSubscription.enterEmailAndSubscribe(randomEmail);
        // Verify success message 'You have been successfully subscribed!' is visible
        await cartPageSubscription.verifySubscriptionSuccess();
    });
});