import { expect, test } from '../../fixtures/test-fixtures';
import { makeUser } from '../../test-data/user';

test.describe('Register', { tag: '@regression' }, () => {
  // these tests exercise the register form itself, so start with an empty session
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  // positive test cases for register
  test('customer can register a new account', { tag: '@smoke' }, async ({ page, registerPage }) => {
    const user = makeUser();
    // user = a fresh RegisterUser object, new faker name and unique email every run

    await registerPage.register(user);
    await expect(page).toHaveURL(/auth\/login/);
  });

  // negative test cases for register
  test('duplicate email shows an error', async ({ registerPage }) => {
    const user = { ...makeUser(), email: process.env.USER_EMAIL! };
    // user = a fresh RegisterUser, but with the email of an account that already exists

    await registerPage.register(user);
    await registerPage.expectRegisterError('already exists');
    await registerPage.expectOnRegisterPage();
  });

  test('breached password shows an error', async ({ registerPage }) => {
    const user = { ...makeUser(), password: 'Password123!' };
    // user = a fresh RegisterUser, but with a password found in public data leaks

    await registerPage.register(user);
    await registerPage.expectRegisterError('data leak');
    await registerPage.expectOnRegisterPage();
  });

  test('empty form shows the required errors', async ({ registerPage }) => {
    await registerPage.submit();
    await registerPage.expectFieldErrors('First name is required', 'Password is required');
    await registerPage.expectOnRegisterPage();
  });
});
