import { test, expect } from '@playwright/test';
import { AdminDashboardPage } from '../../pages/admin-dashboard-page';

// positive test cases for admin dashboard
test('dashboard loads for admin', async ({ page }) => {
const adminDashboardPage = new AdminDashboardPage(page);

await adminDashboardPage.goto();
await expect(page).toHaveURL(/admin\/dashboard/)
await expect(adminDashboardPage.heading).toBeVisible();
 

});