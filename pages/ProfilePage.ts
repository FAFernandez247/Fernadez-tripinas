import { expect, Locator, Page } from '@playwright/test';

export class ProfilePage {
    // Locators
    public readonly profileHeader: Locator;
    public readonly openUserButton: Locator;
    public readonly manageAccountButton: Locator;
    public readonly signOutButton: Locator;
    public readonly securityButton: Locator;
    public readonly deleteButton: Locator;
    public readonly deleteConfirmText: Locator;
    public readonly updateProfileButton: Locator;
    public readonly saveButton: Locator;
    public readonly exitModal: Locator;
    public readonly updateUsernameButton: Locator;

    constructor(public readonly page: Page) {
        this.profileHeader = page.getByText('Profile');
        this.openUserButton = page.getByRole('button', { name: 'Open user button' });
        this.manageAccountButton = page.getByRole('menuitem', { name: 'Manage account' });
        this.signOutButton = page.getByRole('menuitem', { name: 'Sign out' });
        this.securityButton = page.getByRole('button', { name: 'Security' });
        this.deleteButton = page.getByRole('button', { name: 'Delete account' });
        this.deleteConfirmText = page.getByRole('textbox', { name: 'Type "Delete account" below' });
        this.updateProfileButton = page.getByRole('button', { name: 'Update profile' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.exitModal = page.getByRole('button', { name: 'Close modal' });
        this.updateUsernameButton = page.getByRole('button', { name: 'Update username' });
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

    async clickUpdateProfile() {
        await this.updateProfileButton.click();
    }

    async clickUpdateUsername() {
        await this.updateUsernameButton.click();
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async clickSecurity() {
        await this.securityButton.click();
    }

    async clickExitModal() {
        await this.exitModal.click();
    }

    async deleteAccount() {
        await this.deleteButton.click();
        await this.deleteConfirmText.fill('Delete account');
        await this.deleteButton.click();

        await this.page.waitForURL('http://localhost:5173/sign-in');
    }

}