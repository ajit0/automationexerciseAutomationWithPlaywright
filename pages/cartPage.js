const { test, expect } = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page = page;
    }

    get viewCartButton() {
        return this.page.locator("a[href='/view_cart']").first();;
    }

    get cartItems() {
        return this.page.locator('table>>tbody>>tr');
    }
    get quantity(){
        return this.page.locator('.cart_quantity >> nth=0');
    }
    get proceedToCheckoutButton() {
        return this.page.locator('.check_out');
    }


    async navigateToCart() {
        await this.viewCartButton.click();
    }
    async verifyCartPageVisible() {
        await expect(this.page).toHaveURL('/view_cart');
    }
    async clickProceedToCheckout() {
        await this.proceedToCheckout.click();
    }

    async verifyProductsInCart() {
        const items = await this.cartItems.count();
        if (items !== 2) {
            throw new Error('Expected 2 items in the cart');
        }
    }
   async getProductDetails() {
        const productDetails = [];
        const items = await this.cartItems.count();

        for (let i = 0; i < items; i++) {
            const price = await this.page.locator(`table >> tbody >> tr:nth-child(${i + 1}) >> .cart_price >> p`).innerText();
            const quantity = await this.page.locator(`table >> tbody >> tr:nth-child(${i + 1}) >> .cart_quantity >> button`).innerText();
            const total = await this.page.locator(`table >> tbody >> tr:nth-child(${i + 1}) >> .cart_total >> p`).innerText();

            productDetails.push({
                price: parseFloat(price.replace('Rs. ', '')),
                quantity: parseInt(quantity),
                total: parseFloat(total.replace('Rs. ', ''))
            });
        }

        return productDetails;
    }
    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}

module.exports = { CartPage };