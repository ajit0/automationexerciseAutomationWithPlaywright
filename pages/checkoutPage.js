const { test, expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    get registerLoginButton() {
        return this.page.getByRole('link', { name: 'Register / Login' });
    }

    get continueButton(){
        return this.page.locator('[data-qa="continue-button"]');
    }

    get addressDetailsHeader() {
        return this.page.locator('h2:has-text("Address Details")');
    }

    get reviewOrderHeader() {
        return this.page.locator('h2:has-text("Review Your Order")');
    }

    get commentTextArea() {
        return this.page.locator('textarea[name="message"]');
    }

    get placeOrderButton() {
        return this.page.locator('.check_out');
    }

    get nameOnCardInput() {
        return this.page.locator('input[name="name_on_card"]');
    }

    get cardNumberInput() {
        return this.page.locator('input[name="card_number"]');
    }

    get cvcInput() {
        return this.page.locator('input[name="cvc"]');
    }

    get expiryMonth() {
        return this.page.locator("input[placeholder='MM']");
    }
    get expiryYear() {
        return this.page.locator("input[placeholder='YYYY']");
    }

    get payAndConfirmOrderButton() {
        return this.page.locator('#submit')
    }

    get orderSuccessMessage() {
        return this.page.locator('text=Your order has been placed successfully!');

    }

    get downloadInvoiceButton() {
        return this.page.getByRole('link', { name: 'Download Invoice' })
    }

    get deleteAccountButton() {
        return this.page.locator('a[href="/delete_account"]');
    }

    get accountDeletedMessage() {
        return this.page.locator('text=ACCOUNT DELETED!');
    }

    async clickRegisterLoginButton() {
        await this.registerLoginButton.click();
    }
    async clickContinueButton(){
        await this.continueButton.click();
    }
    async verifyAddressDetailsAndReviewOrder() {
        await expect(this.addressDetailsHeader).toBeVisible();
        await expect(this.reviewOrderHeader).toBeVisible();
    }

    async enterDescriptionAndPlaceOrder(description) {
        await this.commentTextArea.fill(description);
        await this.placeOrderButton.click();
    }

    async enterPaymentDetails(name, cardNumber, cvc, expireMonth,expireYear) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvcInput.fill(cvc);
        await this.expiryMonth.fill(expireMonth);
        await this.expiryYear.fill(expireYear);
    }

    async clickPayAndConfirmOrder() {
        await this.payAndConfirmOrderButton.click();
    }

    async verifyOrderSuccessMessage() {
        const isVisible = await this.orderSuccessMessage.isVisible();
            if (isVisible) {
                console.log('Order success message is visible.');             
            } else {
                console.error('Order success message is not visible.');
            }
    }

    async clickDownloadInvoiceButton() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download event
            this.downloadInvoiceButton.click(), // Perform the action that initiates the download
        ]);
        if (download) {
            console.log('File downloaded successfully.');
            await download.saveAs('./assets/Invoice.pdf');
          } else {
            console.log('File download failed.');
          }
        const path = await download.path();
        console.log(`Downloaded file path: ${path}`);
        expect(path).toBeTruthy(); // Ensure the download path is valid

    }

    async clickDeleteAccountButton() {
        await this.deleteAccountButton.click();
    }

    async verifyAccountDeleted() {
        await expect(this.accountDeletedMessage).toBeVisible();

            
        
    }
}

module.exports = { CheckoutPage };