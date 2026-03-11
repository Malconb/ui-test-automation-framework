import { test, expect } from '@playwright/test';

test.describe('Example Basic Tests', () => {
  test('has title', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'https://example.com');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/.*Example.*/);
  });

  test('get started link', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'https://example.com');
    
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
    
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });

  test('basic form interaction', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL || 'https://example.com'}/contact`);
    
    // Fill form fields
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'This is a test message');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify success message
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('.success-message')).toContainText('Thank you');
  });

  test('element visibility and interactions', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'https://example.com');
    
    // Wait for element to be visible
    await expect(page.locator('.main-content')).toBeVisible();
    
    // Check if element exists
    const element = page.locator('.feature-card');
    await expect(element).toHaveCount(3);
    
    // Click on first feature card
    await element.first().click();
    
    // Verify navigation
    await expect(page).toHaveURL(/.*features/);
  });

  test('screenshot on failure', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'https://example.com');
    
    // This will fail and take a screenshot
    await expect(page.locator('.non-existent-element')).toBeVisible();
  });
});
