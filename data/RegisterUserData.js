const { faker } = require('@faker-js/faker');


class RegisterUserData {
    constructor() {
        this.name = faker.person.firstName();
        this.email = faker.internet.email();
        this.password = 'Ajit@1995';
        this.dobDay = faker.number.int({ min: 1, max: 28 }).toString();
        this.dobMonth = faker.date.month();
        this.dobYear = faker.number.int({ min: 1950, max: 2000 }).toString();
        this.firstName = this.name;
        this.lastName = faker.person.lastName();
        this.company = faker.company.name();
        this.address1 = faker.location.streetAddress();
        this.country = 'India'; 
        this.state = faker.location.state();
        this.city = faker.location.city();
        this.zipCode = faker.location.zipCode();
        this.mobileNumber = faker.phone.number();
    }

    getRegisterUserData() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            dobDay: this.dobDay,
            dobMonth: this.dobMonth,
            dobYear: this.dobYear,
            firstName: this.firstName,
            lastName: this.lastName,
            company: this.company,
            address1: this.address1,
            country: this.country,
            state: this.state,
            city: this.city,
            zipCode: this.zipCode,
            mobileNumber: this.mobileNumber
        };
    }
}

module.exports = {
     RegisterUserData
 };