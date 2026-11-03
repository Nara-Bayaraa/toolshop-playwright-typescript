import { expect, test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

import { ADMIN_FILE, USER_FILE } from '../playwright/auth-paths';

setup('authenticate as customer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await expect(page).toHaveURL(/account/, { timeout: 15_000 });
  await page.context().storageState({ path: USER_FILE });
});

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
  await expect(page).toHaveURL(/admin/, { timeout: 15_000 });
  await page.context().storageState({ path: ADMIN_FILE });
});
