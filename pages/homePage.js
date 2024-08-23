const { test, expect } = require('@playwright/test');
class HomePage {
    constructor(page) {
        this.page = page;
    }

    get subscriptionText() {
        return this.page.locator('text=SUBSCRIPTION');
    }

    get homePageText() {
        return this.page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first();
    }
    async navigateToHomePage() {
        await this.page.goto('/'); 
    }
    async verifyHomePageVisible() {
        await expect(this.page).toHaveURL('/');
    }
    async scrollToFooter() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
    async scrollToTop() {
        await this.page.click('a[href="#top"]');
    }
}

module.exports = { HomePage };