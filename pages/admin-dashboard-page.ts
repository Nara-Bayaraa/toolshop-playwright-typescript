import { Locator, Page } from '@playwright/test';

export class AdminDashboardPage {
readonly url = '/admin/dashboard';
readonly heading: Locator;

constructor(readonly page: Page) {
this.heading = page.getByRole('heading', { name: 'Sales over the years' });

}

async goto(): Promise<void>{ 
await this.page.goto(this.url);

}
}

