const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');

let page;
let homePage;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    await page.goto('/');
});

test.afterEach(async () => {
    await page.close();
});

test('Test Case 25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async () => {
    // Verify that home page is visible successfully
    await expect(page).toHaveURL('/');
    
    // Scroll down page to bottom
    await homePage.scrollToFooter();
    
    // Verify 'SUBSCRIPTION' is visible
    await expect(homePage.subscriptionText).toBeVisible();
    
    // Click on arrow at bottom right side to move upward
    await homePage.scrollToTop();
    
    // Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    await expect(homePage.homePageText).toBeVisible();
});