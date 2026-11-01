import { expect, test } from '../../fixtures/test-fixtures';

test.describe('Login', { tag: '@regression' }, () => {
  // these tests exercise the login form itself, so start with an empty session
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // positive test cases for login
  test('valid user lands on account page', { tag: '@smoke' }, async ({ page, loginPage }) => {
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL(/account/);
  });

  // negative test cases for login
  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(process.env.USER_EMAIL!, 'wrongpass');
    await loginPage.expectLoginError('Invalid email or password');
    await loginPage.expectOnLoginPage();
  });

  test('wrong email shows an error', async ({ loginPage }) => {
    await loginPage.login(process.env.FAILED_LOGIN_EMAIL!, process.env.USER_PASSWORD!);
    await loginPage.expectLoginError('Invalid email or password');
    await loginPage.expectOnLoginPage();
  });

  test('empty email and password shows an error', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.expectFieldErrors('Email is required', 'Password is required');
    await loginPage.expectOnLoginPage();
  });
});
