const { test, expect } = require('@playwright/test');
const fs = require('fs')
const { RegisterUserData } = require('../data/RegisterUserData')
const { RegisterPage } = require('../pages/registerPage');
test.describe('User Registration', () => {
    let registerUserData;
    let registerPage;

    test.beforeEach(async ({ page }) => {
        
        registerUserData = new RegisterUserData();  // Create an instance if it's a class
        registerPage = new RegisterPage(page);
        await registerPage.navigate();
    });

    test('should register a new user successfully', async ({ page }) => {
        const userData = registerUserData.getRegisterUserData(); // Changed from getRegisteredUser to getRegisterUserData

        await page.waitForTimeout(5000)
        // 1. Verify that Home link is high
        await expect(registerPage.isHomeLinkActive()).resolves.toBe(true);
        await registerPage.fillRegistrationForm(userData);
        await page.waitForTimeout(3000)
        await registerPage.submitRegistrationForm();
        await page.waitForTimeout(5000)
        await expect(registerPage.successMessage).toBeVisible();
        await expect(registerPage.successMessage).toHaveText('Account Created!');
       // DataStore.setRegisteredUser(userData);
       fs.writeFileSync('registeredUser.json', JSON.stringify(userData, null, 2));
       console.log('Test finished ,cleaning the traces')
    });
});