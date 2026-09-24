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

  test('valid user lands on account page', async ({ page }) => {
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL(/account/);
  });

  test('wrong password shows an error', async ({ page }) => {
    await loginPage.login(process.env.USER_EMAIL!, 'wrongpass');
    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('wrong email shows an error', async ({ page }) => {
    await loginPage.login('wrongemail@example.com', process.env.USER_PASSWORD!);
    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('empty email and password shows an error', async ({ page }) => {
    await loginPage.login('', '');
    await expect(page.getByTestId('email-error')).toBeVisible();
    await expect(page.getByTestId('password-error')).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });
});