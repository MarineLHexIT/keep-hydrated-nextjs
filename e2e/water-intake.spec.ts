import { test, expect } from '@playwright/test';

test.describe('Water Intake Tracking', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard page
    await page.goto('/dashboard');
  });

  test('displays water intake periods correctly', async ({ page }) => {
    // Check if the page has loaded
    await expect(page).toHaveTitle(/Dashboard/);

    // Check if water intake periods are visible
    await expect(page.getByRole('heading', { name: /Today/i })).toBeVisible();
    
    // Check if the water intake items are present
    const waterIntakeItems = page.locator('.rounded-lg.border');
    await expect(waterIntakeItems).toHaveCount(3); // Day, Week, and Month views
  });

  test('shows correct total intake values', async ({ page }) => {
    // Wait for the water intake data to load
    await page.waitForSelector('.rounded-lg.border');

    // Get all water intake items
    const waterIntakeItems = await page.locator('.rounded-lg.border').all();

    // Check if each item has a total value
    for (const item of waterIntakeItems) {
      const totalText = await item.locator('.text-2xl.font-bold').textContent();
      expect(totalText).toMatch(/\d+ml/);
    }
  });
}); 