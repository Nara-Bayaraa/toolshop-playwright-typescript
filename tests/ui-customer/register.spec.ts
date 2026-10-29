import { expect, test } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
import { makeUser } from '../../test-data/user';

test.describe('Register', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  // positive test cases for register
  test('customer can register a new account', async ({ page }) => {
    const user = makeUser();
    // user = a fresh RegisterUser object, new faker name and unique email every run
    await registerPage.register(user);

    await expect(page).toHaveURL(/auth\/login/);
  });

  // negative test cases for register
  test('duplicate email shows an error', async ({ page }) => {
    const user = { ...makeUser(), email: process.env.USER_EMAIL! };
    await registerPage.register(user);

    await expect(registerPage.emailExistsError).toBeVisible();
    await expect(page).toHaveURL(/auth\/register/);
  });

  test('breached password shows an error', async ({ page }) => {
    const user = { ...makeUser(), password: 'Password123!' };
    await registerPage.register(user);

    await expect(registerPage.passwordLeakError).toBeVisible();
    await expect(page).toHaveURL(/auth\/register/);
  });

  test('empty form shows all required errors', async ({ page }) => {
    await registerPage.submit();

    await expect(registerPage.firstNameRequiredError).toBeVisible();
    await expect(registerPage.passwordRequiredError).toBeVisible();
    await expect(page).toHaveURL(/auth\/register/);
  });
});
