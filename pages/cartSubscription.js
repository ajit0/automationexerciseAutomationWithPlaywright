const { test, expect } = require('@playwright/test');
class CartPageSubscription {
    constructor(page) {
        this.page = page;
    }

    get cartButton() {
        return this.page.locator("a[href='/view_cart']").first();
    }

    get subscriptionSection() {
        return this.page.locator('footer');
    }

    get subscriptionText() {
        return this.page.locator("div[class='single-widget'] h2");
    }

    get emailInput() {
        return this.page.locator('#susbscribe_email');
    }

    get subscribeButton() {
        return this.page.locator('#subscribe');
    }

    get successMessage() {
        return this.page.locator('text=You have been successfully subscribed!');
    }

    async navigateToCart() {
        await this.cartButton.click();
    }

    async scrollToFooter() {
        await this.subscriptionSection.scrollIntoViewIfNeeded();
    }

    async enterEmailAndSubscribe(email) {
        await this.emailInput.click()
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }

    async verifySubscriptionSuccess() {
        await expect(this.successMessage).toBeVisible();
    }
}

module.exports = { CartPageSubscription };