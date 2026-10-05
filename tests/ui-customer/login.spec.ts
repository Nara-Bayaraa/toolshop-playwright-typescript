import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';

test.describe('Login', () => {
  // these tests exercise the login form itself, so start with an empty session
  test.use({ storageState: { cookies: [], origins: [] } });

  let loginPage: LoginPage; // shared page object, set fresh before each test

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

// positive test cases for login
  test('valid user lands on account page', async ({ page }) => {
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL(/account/);
  });


// negative test cases for login
  test('wrong password shows an error', async ({ page }) => {
   await loginPage.login(process.env.USER_EMAIL!, 'wrongpass');
    await expect(loginPage.loginError).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('wrong email shows an error', async ({ page }) => {
    await loginPage.login(process.env.FAILED_LOGIN_EMAIL!, process.env.USER_PASSWORD!);
    await expect(loginPage.loginError).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('empty email and password shows an error', async ({ page }) => {
    await loginPage.login('', '');
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });
});