
const { expect } = require('@playwright/test');

class SearchProductPage {
    constructor(page) {
        this.page = page;
    }

    get productButton() {
        return this.page.locator("a[href='/products']");
    }

    get searchField() {
        return this.page.getByPlaceholder('Search Product');
    }

    get searchIcon() {
        return this.page.getByRole('button', { name: '' });
    }
    get allProducts() {
        return this.page.getByText("All Products");
    }
    get searchedProductsName() {
        return this.page.locator("div[class='productinfo text-center'] p");
    }

    get products() {
        return this.page.locator('.single-products .productinfo >> p');
    }
    async navigateToProductsPage() {
        await this.productButton.click();
        await this.page.waitForURL('/products');
    }
    async verifyAllProductText(){
        return await this.allProducts.isVisible();
    }
    async verifyProductsName(searchTerm){
      const productName =  await this.products.allTextContents()
      productName.forEach(element => {
        expect(element).toContain(searchTerm)
      });
      console.log(productName)
    }

    async searchForProduct(productName) {
        await this.searchField.fill(productName);
        await this.searchIcon.click();
    }

    
}
module.exports = { SearchProductPage };
