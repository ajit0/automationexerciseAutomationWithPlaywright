// loginPage.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const fs = require('fs')
test.describe('LoginPage Tests', () => {
    let page;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        // await loginPage.initialize();
        await loginPage.navigate();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('should login with registered user', async ({ page }) => {
        const userData = JSON.parse(fs.readFileSync('registeredUser.json', 'utf-8'));
        expect(userData, 'No registered user found. Run registration test first.').not.toBeNull();
        if (userData) {
            await loginPage.login(userData.email, userData.password);
            await expect(page).toHaveURL('/');
            console.log('User loggedin Sucessfully as ' +userData.name)
            await page.waitForTimeout(3000)
            const loggedInUserLocator = await loginPage.assertLoggedinState(userData);
            await expect(loggedInUserLocator).toBeVisible();
            console.log('Login attempt completed');
        } else {
            throw new Error('No registered user found. Run registration test first.');
        }
    });
});