import { test } from '../../shared/base.ts';
import { generateTestUser } from '../../shared/fakerUtils.ts';

const testUser = generateTestUser();

test.describe('Account Management - Updates', {
  annotation: { type: 'functional', description: 'Verify user can update profile information' },
}, () => {

    test.beforeEach(async ({ loginPage, registerPage }) => {
        await loginPage.navigateToLogin();
        await loginPage.clickSignUpLink();
        await registerPage.fillOptionalFields(testUser.firstName, testUser.lastName);
        await registerPage.fillRequiredFields(testUser.email, testUser.username, testUser.password);
        await loginPage.verifyDashboard();
    });
    test.afterEach(async ({ profilePage }) => {
        await profilePage.clickIcon();
        await profilePage.clickManageAccount();
        await profilePage.clickSecurity();
        await profilePage.deleteAccount();
    });
    test('Verify user can update first and last name', { tag: ['@update', '@HappyPath'] }, async ({ profilePage, registerPage, loginPage }) => {
        await test.step('Click the icon in the top-right corner', async () => {
            await profilePage.clickIcon();
        });
        await test.step('Click Manage Account button', async () => {
            await profilePage.clickManageAccount();
        });
        await test.step('Click Update profile button', async () => {
            await profilePage.clickUpdateProfile();
        });
        await test.step('Update first and last name', async () => {
            await registerPage.fillOptionalFields(testUser.newFirstName, testUser.newLastName);
            await profilePage.clickSaveButton();
        });
        await test.step('Verify that the Profile section is displayed and shows the correct Full Name', async () => {
            await profilePage.clickExitModal();
            await loginPage.verifyProfileDetails(testUser.newFirstName + ' ' + testUser.newLastName, testUser.username, testUser.email);
        });
    });
    test('Verify validation message when updated first and last name exceeds the character limit', { tag: ['@validation', '@max-length'] }, async ({ registerPage, profilePage }) => {
        await test.step('Click the icon in the top-right corner', async () => {
            await profilePage.clickIcon();
        });
        await test.step('Click Manage Account button', async () => {
            await profilePage.clickManageAccount();
        });
        await test.step('Click Update profile button', async () => {
             await profilePage.clickUpdateProfile();
        });
        await test.step('Update first and last name with more that 256 characters', async () => {
            await registerPage.fillOptionalFields('a'.repeat(257), 'w'.repeat(257));
            await profilePage.clickSaveButton();
        });
        await test.step('Verify that a validation message is displayed', async () => {
            await registerPage.verifyFirstNameErrorMessage();
            await registerPage.verifyLastNameErrorMessage();
        });
        await test.step('Close modal', async () => {
            await profilePage.clickExitModal();
        });
    });
    test('Verify user can update username', { tag: ['@update', '@HappyPath'] }, async ({ profilePage, registerPage, loginPage }) => {
        await test.step('Click the icon in the top-right corner', async () => {
            await profilePage.clickIcon();
        });
        await test.step('Click Manage Account button', async () => {
            await profilePage.clickManageAccount();
        });
        await test.step('Click Update profile button', async () => {
            await profilePage.clickUpdateUsername();
        });
        await test.step('Update username', async () => {
            await registerPage.usernameInput.fill(testUser.newUsername);
            await profilePage.clickSaveButton();
        });
        await test.step('Verify that the Profile section is displayed and shows the correct Full Name', async () => {
            await profilePage.clickExitModal();
            await loginPage.verifyProfileDetails(testUser.firstName + ' ' + testUser.lastName, testUser.newUsername, testUser.email);
        });
    });
});
