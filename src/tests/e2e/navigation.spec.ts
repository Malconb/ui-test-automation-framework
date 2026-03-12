import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login-page/login.page';
import { TestData } from '../../utils/test-data';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page, process.env.BASE_URL || 'https://example.com');
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);
  });

  test('should navigate to dashboard', async ({ page }) => {
    await page.click('[data-testid="dashboard-link"]');
    
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('[data-testid="dashboard-title"]')).toBeVisible();
  });

  test('should navigate to profile page', async ({ page }) => {
    await page.click('[data-testid="profile-link"]');
    
    await expect(page).toHaveURL(/.*\/profile/);
    await expect(page.locator('[data-testid="profile-info"]')).toBeVisible();
  });

  test('should navigate to settings page', async ({ page }) => {
    await page.click('[data-testid="settings-link"]');
    
    await expect(page).toHaveURL(/.*\/settings/);
    await expect(page.locator('[data-testid="settings-options"]')).toBeVisible();
  });

  test('should navigate back using browser back button', async ({ page }) => {
    // Navigate to profile
    await page.click('[data-testid="profile-link"]');
    await expect(page).toHaveURL(/.*\/profile/);
    
    // Go back
    await page.goBack();
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should navigate using breadcrumbs', async ({ page }) => {
    // Navigate to settings
    await page.click('[data-testid="settings-link"]');
    await expect(page).toHaveURL(/.*\/settings/);
    
    // Click breadcrumb
    await page.click('[data-testid="breadcrumb-dashboard"]');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-toggle"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Navigate via mobile menu
    await page.click('[data-testid="mobile-dashboard-link"]');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});
