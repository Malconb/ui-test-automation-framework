import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login.page';
import { TestData } from '../../utils/test-data';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, process.env.BASE_URL || 'https://example.com');
  });

  test('should display login page correctly', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login('invaliduser', 'wrongpassword');
    
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.login(TestData.validUser.username, TestData.validUser.password);
    
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('.welcome-message')).toBeVisible();
  });

  test('should disable login button with empty credentials', async ({ page }) => {
    await loginPage.navigateToLogin();
    
    const loginButton = page.locator('#login-button');
    await expect(loginButton).toBeDisabled();
  });

  test('should show validation for empty fields', async ({ page }) => {
    await loginPage.navigateToLogin();
    await loginPage.clickElement('#login-button');
    
    await expect(page.locator('#username-error')).toBeVisible();
    await expect(page.locator('#password-error')).toBeVisible();
  });
});
