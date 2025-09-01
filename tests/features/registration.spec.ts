import { test } from '../../shared/base.ts';
import users from '../../test-data/users.json';

const passwordErrorMessage = "Your password must contain 8 or more characters.";
const validEmail = 'test@example.com';
const validPassword = 'ValidPass123';
test.describe('Registration UI', {
    annotation: { type: 'UI', description: 'Tests the presence of UI elements on the registration page' } 
}, async () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
    });
    test('Verify all fields are present on the registration page', { tag: ['@UI'] }, async ({ loginPage, registerPage }) => {
        await test.step('Click "Sign up" link', async () => {
            await loginPage.clickSignUpLink();
        });
        await test.step('Verify fields are present on the registration page', async () => {
            await registerPage.verifySignUpPageUI();
        });
    });
    test('Verify optional and required fields on Sign Up page', { tag: ['@UI'] }, async ({ loginPage, registerPage }) => {
        await test.step('Click "Sign up" link', async () => {
            await loginPage.clickSignUpLink();
        });
        await test.step('Verify that First Name and Last Name fields are marked as optional', async () => {
            await registerPage.isFieldOptional();
        });
        await test.step('Verify that Email, Username, and Password are not marked as optional', async () => {
            await registerPage.isFieldNotOptional();
        });
        await test.step('Leave required fields blank and click "Continue" button', async () => {
            await registerPage.registerUser("", "", "", "", "");
        });
        await test.step('Verify user stays in registration page and fields show error message except optional fields', async () => {
            await registerPage.verifySignUpPageUI();
            await loginPage.verifyPasswordErrorMessage(passwordErrorMessage);
        });
    });
});
test.describe('Field Validation', {
  annotation: { type: 'validation', description: 'Verify input validation for username, names, and password fields' }
}, async () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLogin();
        await loginPage.clickSignUpLink();
    });
  // username max/min
    test('Verify that validation message is displayed if user exceeds the character limit for username', async ({ registerPage }) => {
        await test.step('Fill username with more than 64 characters', async () => {
            await registerPage.usernameInput.fill('a'.repeat(65));
        });
        await test.step('Fill email and password with valid values', async () => {
            await registerPage.emailInput.fill(validEmail);
            await registerPage.registerPasswordInput.fill(validPassword);
            await registerPage.continueButton.click();
        });
        await test.step('Verify that a validation message "Your username must be between 4 and 64 characters long." is displayed', async () => {
            await registerPage.verifyUsernameErrorMessage();
        });
    });
  // first name restrictions
  // last name restrictions
  // password min length
  // spaces/blank handling
});
test.describe('Successful Registration', {
  annotation: { type: 'functional', description: 'Verify user can successfully register with valid data' }
}, () => {
  // registration with valid inputs redirects to dashboard
});