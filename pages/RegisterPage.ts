import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
    // Locators
    public readonly registerHeader: Locator;
    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly usernameInput: Locator;
    public readonly emailInput: Locator;
    public readonly registerPasswordInput: Locator;
    public readonly continueButton: Locator;
    public readonly signInLink: Locator;
    public readonly optionalText: Locator;
    public readonly errorMessageUsername: Locator;

    constructor(public readonly page: Page) {
        this.registerHeader = page.getByRole('heading', { name: 'Create your account' });
        this.firstNameInput = page.locator('#firstName-field');
        this.lastNameInput = page.locator('#lastName-field');
        this.usernameInput = page.locator('#username-field');
        this.emailInput = page.locator('#emailAddress-field');
        this.registerPasswordInput = page.locator('#password-field');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.signInLink = page.getByRole('link', { name: 'Sign in' });
        this.optionalText = page.getByText('Optional');
        this.errorMessageUsername = page.locator('#error-username');
    }

    async clickSignInLink() {
        await this.signInLink.click();
    }

    async verifySignUpPageUI() {
        await expect(this.registerHeader).toBeVisible();
        await expect(this.registerHeader).toContainText('Create your account');
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.emailInput).toBeVisible();
        await expect(this.registerPasswordInput).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.signInLink).toBeVisible();
    }

    async isFieldOptional() {
        await expect((this.optionalText).first()).toBeVisible();
        await expect((this.optionalText).nth(1)).toBeVisible();
    }

    async isFieldNotOptional() {
        await expect(this.emailInput).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.registerPasswordInput).toBeVisible();
        await expect((this.optionalText).nth(3)).not.toBeVisible();
    }

    /**
     * @param firstName
     * @param lastName
     * @param username
     * @param email
     * @param registerPassword 
     */

    async registerUser(firstName: string, lastName: string, email: string, username: string, registerPassword: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.usernameInput.fill(username);
        await this.registerPasswordInput.fill(registerPassword);
        await this.continueButton.click();
    }

    async verifyUsernameErrorMessage() {
        await expect(this.errorMessageUsername).toBeVisible();
        await expect(this.errorMessageUsername).toContainText('Your username must be between 4 and 64 characters long.');
    }
}