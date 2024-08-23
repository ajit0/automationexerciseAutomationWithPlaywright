const fs = require('fs');
class LoginPage {
    constructor(page) {
        this.page = page;
    
    }
    get emailInput(){
        return this.page.locator("input[data-qa='login-email']");

    }
    get passwordInput(){
        return this.page.locator("input[placeholder='Password']");
    }
    get LoginButton(){
        return this.page.locator("button[data-qa='login-button']");
    
    }
    get loggedInUser() {
        return this.page.locator('a:has-text("Logged in as") b');
    }
    async navigate() {
        
        await this.page.goto('/login');
       // await this.page.context().clearCookies();
    }
    async assertLoggedinState(userData) {
        // Verify login success using the user's name from the userData
        const loggedInUserName = this.page.locator(`a:has-text("Logged in as") b:has-text("${userData.name}")`);
        return loggedInUserName;
    }
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.LoginButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    
    }
}
module.exports = {LoginPage};
