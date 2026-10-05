import { test, expect } from '@playwright/test';

test.describe('GET /products', () => {
  test('returns a paginated list', async ({ request }) => {
    const response = await request.get('/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.current_page).toBe(1);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data.length).toBeLessThanOrEqual(body.per_page);
  });

  test('each product has the expected shape', async ({ request }) => {
    const response = await request.get('/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    for (const product of body.data) {
      expect(typeof product.id).toBe('string');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(typeof product.in_stock).toBe('boolean');
      expect(product.category?.name).toBeTruthy();
      expect(product.brand?.name).toBeTruthy();
    }
  });
});