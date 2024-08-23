function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(2, 11);
    return `test_${randomString}@example.com`;
}
async function getProductPrice(productLocator) {
    let productPrice = await productLocator.locator('h2').textContent();
    productPrice = productPrice.split(' ')[1]; // Adjust the split logic based on actual text format
    return productPrice;
}


module.exports={
    generateRandomEmail,
    getProductPrice,
    
}