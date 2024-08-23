const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');
const { LoginPage } = require('../pages/loginPage');
const { ProductsPage } = require('../pages/productPage');
const { RegisterPage } = require('../pages/registerPage');
const { RegisterUserData } = require('../data/RegisterUserData')

const fs = require('fs')

let page;
let homePage;
let cartPage;
let checkoutPage;
let loginPage;
let productsPage;
let registerPage;
let registerUserData;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await homePage.navigateToHomePage();
    registerUserData = new RegisterUserData(); 
    registerPage = new RegisterPage(page);
});

test.afterEach(async () => {
    await page.close();
});

test('Test Case 24: Download Invoice after purchase order', async () => {
    const userData = JSON.parse(fs.readFileSync('registeredUser.json', 'utf-8'));
    // Verify that home page is visible successfully
    await homePage.verifyHomePageVisible();
    
    // Add products to cart
    await productsPage.addFirstProductToCart();
    
    // Click 'Cart' button
    await cartPage.navigateToCart();
    
    // Verify that cart page is displayed
    await cartPage.verifyCartPageVisible();
    
    // Click Proceed To Checkout
    await cartPage.clickProceedToCheckout();
    
    // Click 'Register / Login' button
    await checkoutPage.clickRegisterLoginButton();
    
    // Fill all details in Signup and create account
    const newuserData = registerUserData.getRegisterUserData(); 
    await registerPage.fillRegistrationForm(newuserData);
    await registerPage.submitRegistrationForm();
    // Verify 'ACCOUNT CREATED!' and click 'Continue' button
    await expect(registerPage.successMessage).toBeVisible();
    await expect(registerPage.successMessage).toHaveText('Account Created!');
     // Verify 'Logged in as username' at top
     await checkoutPage.clickContinueButton();
     await page.waitForLoadState('domcontentloaded');
    //  await page.reload()
     const loggedInUserLocator = await loginPage.assertLoggedinState(userData);
    await expect(loggedInUserLocator).toBeVisible();

   
    // Click 'Cart' button
    await cartPage.navigateToCart();
    // Click 'Proceed To Checkout' button
    await cartPage.clickProceedToCheckout();
    // Verify Address Details and Review Your Order
    await checkoutPage.verifyAddressDetailsAndReviewOrder();
    // Enter description in comment text area and click 'Place Order'
    await checkoutPage.enterDescriptionAndPlaceOrder('Test order description');
    
    // Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await checkoutPage.enterPaymentDetails('Test Name', '1234567812345678', '123', '12','2030');
    
    // Click 'Pay and Confirm Order' button
    await checkoutPage.clickPayAndConfirmOrder();
    // Verify success message 'Your order has been placed successfully!'
    await checkoutPage.verifyOrderSuccessMessage();
    // Click 'Download Invoice' button and verify invoice is downloaded successfully
    await checkoutPage.clickDownloadInvoiceButton();
    // Click 'Continue' button
    await checkoutPage.clickContinueButton();
    
    // Click 'Delete Account' button
    await checkoutPage.clickDeleteAccountButton();
    // Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await checkoutPage.verifyAccountDeleted();
    await checkoutPage.clickContinueButton();
});