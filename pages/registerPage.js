const { expect } = require('@playwright/test');
const fs = require('fs');

class RegisterPage {
    constructor(page) {
        this.page = page;
        this.successMessage = page.locator('h2.title.text-center[data-qa="account-created"]');
        this.homeLink = page.locator("//a[normalize-space()='Home']");
    }

    async navigate() {
        await this.page.goto('/');
        // Any additional setup specific to the register page
    }

    get getsigninSignUpLink() {
        return this.page.getByRole('link', { name: ' Signup / Login' });
    }

    get NameField() {
        return this.page.getByPlaceholder('Name');
    }

    get emailField() {
        return this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    }

    get signUpButton() {
        return this.page.getByRole('button', { name: 'Signup' });
    }

    get titleSelectMr() {
        return this.page.locator('#uniform-id_gender1');
    }

    get passwordField() {
        return this.page.getByLabel('Password *');
    }

    get dobDay() {
        return this.page.locator('#days');
    }

    get dobMonth() {
        return this.page.locator('#months');
    }

    get dobYears() {
        return this.page.locator('#years');
    }

    get firstNameField() {
        return this.page.getByLabel('First name *');
    }

    get lastNameField() {
        return this.page.getByLabel('Last name *');
    }

    get companyField() {
        return this.page.locator('#company');
    }

    get address1() {
        return this.page.getByLabel('Address * (Street address, P.');
    }

    get countryField() {
        return this.page.locator('#country');
    }

    get stateField() {
        return this.page.getByLabel('State *');
    }

    get cityField() {
        return this.page.getByLabel('City *');
    }

    get zipCodeField() {
        return this.page.locator('#zipcode');
    }

    get mobileNumberField() {
        return this.page.getByLabel('Mobile Number *');
    }

    get createAccountButton() {
        return this.page.getByRole('button', { name: 'Create Account' });
    }

    async fillRegistrationForm(userData) {
        await this.getsigninSignUpLink.click();
        await this.NameField.fill(userData.name);
        await this.emailField.fill(userData.email);
        await this.signUpButton.click();
        await this.titleSelectMr.click();
        await this.passwordField.fill(userData.password);
        await this.dobDay.selectOption(userData.dobDay);
        await this.dobMonth.selectOption(userData.dobMonth);
        await this.dobYears.selectOption(userData.dobYear);
        await this.firstNameField.fill(userData.firstName);
        await this.lastNameField.fill(userData.lastName);
        await this.companyField.fill(userData.company);
        await this.address1.fill(userData.address1);
        await this.countryField.selectOption(userData.country);
        await this.stateField.fill(userData.state);
        await this.cityField.fill(userData.city);
        await this.zipCodeField.fill(userData.zipCode);
        await this.mobileNumberField.fill(userData.mobileNumber);

        // Save user data to JSON file
        fs.writeFileSync('registeredUser.json', JSON.stringify(userData, null, 2));
    }

    async submitRegistrationForm() {
        await this.createAccountButton.click();
    }

    async isHomeLinkActive() {
        const isActive = await this.homeLink.evaluate(el => el.style.color === 'orange');
        return isActive;
    }
}

module.exports = { RegisterPage };