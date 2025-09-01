import { expect, Locator, Page } from '@playwright/test';

export class ProfilePage {
    // Locators
    public readonly profileHeader: Locator;
    public readonly openUserButton: Locator;
    public readonly manageAccountButton: Locator;
    public readonly signOutButton: Locator;

    constructor(public readonly page: Page) {
        this.profileHeader = page.getByText('Profile');
        this.openUserButton = page.getByRole('button', { name: 'Open user button' });
        this.manageAccountButton = page.getByRole('menuitem', { name: 'Manage account' });
        this.signOutButton = page.getByRole('menuitem', { name: 'Sign out' });
    }

    async clickIcon() {
        await this.openUserButton.click();
    }

    async clickSignOut() {
        await this.signOutButton.click();
    }

    async clickManageAccount() {
        await this.manageAccountButton.click();
    }
}