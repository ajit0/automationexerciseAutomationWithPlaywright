const { getProductPrice } = require('../utils/utils');

class ProductsPage {
    constructor(page) {
        this.page = page;
    }
    get productsButton() {
        return this.page.locator('a:has-text("Products")');
    }

    get firstProduct() {
        return this.page.locator('.productinfo').nth(0);
    }

    get secondProduct() {
        return this.page.locator('.productinfo').nth(1);
    }

    get addToCartButton() {
        return this.page.locator('.add-to-cart');
    }

    get continueShoppingButton() {
        return this.page.locator('button:has-text("Continue Shopping")');
    }
    async navigateToProducts() {
        await this.productsButton.click();
    }
  
    async addFirstProductToCart() {
        let firstproductPrice= await getProductPrice(this.firstProduct);
        console.log('First prodcut price '+ firstproductPrice);
        await this.firstProduct.hover();
        await this.page.waitForTimeout(1000);
        //await this.addToCartButton.first().scrollIntoViewIfNeeded();
        await this.addToCartButton.first().click({force:true});
        await this.continueShoppingButton.click();
        await this.page.waitForTimeout(2000);

        return firstproductPrice;
    }
    async addSecondProductToCart() {
        let secondproductPrice= await getProductPrice(this.secondProduct);
        console.log('Second prodcut price '+ secondproductPrice);
        await this.secondProduct.hover();
        await this.page.waitForTimeout(2000);
        //await this.addToCartButton.nth(1).scrollIntoViewIfNeeded();
        await this.addToCartButton.nth(2).click({ force: true });
        await this.page.waitForTimeout(2000);
        await this.continueShoppingButton.click();
        return secondproductPrice;
    }
}
module.exports = { ProductsPage };