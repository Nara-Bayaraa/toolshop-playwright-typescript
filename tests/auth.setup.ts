import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

import { USER_FILE, ADMIN_FILE } from '../playwright/auth-paths';



setup('authenticate as customer', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL(/account/);    
    await page.context().storageState({ path: USER_FILE });

});

setup('authenticate as admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
    await expect(page).toHaveURL(/admin/);    
    await page.context().storageState({ path: ADMIN_FILE });

});

