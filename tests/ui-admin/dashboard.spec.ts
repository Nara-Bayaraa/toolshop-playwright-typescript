import { test, expect } from '@playwright/test';
import { AdminDashboardPage } from '../../pages/admin-dashboard-page';

// positive test cases for admin dashboard
test('dashboard loads for admin', async ({ page }) => {
  test.skip(
    !!process.env.CI,
    'practicesoftwaretesting.com returns 403 to CI runner IPs (Cloudflare). Covered locally until the app runs in Docker.'
  );
  // !!process.env.CI is true on GitHub Actions, undefined on your Mac
  // placed first so nothing below runs when the condition is true

  const adminDashboardPage = new AdminDashboardPage(page);

  await adminDashboardPage.goto();
  await expect(page).toHaveURL(/admin\/dashboard/);
  await expect(adminDashboardPage.heading).toBeVisible();
});
