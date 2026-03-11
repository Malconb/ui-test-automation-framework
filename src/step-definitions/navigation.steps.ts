import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../page-objects/login.page';
import { TestData } from '../utils/test-data';

Given('I am logged in to the application', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateToLogin();
  const validUser = TestData.validUser;
  await loginPage.login(validUser.username, validUser.password);
  await loginPage.waitForLoginSuccess();
});

When('I click on the dashboard link', async function (this: CustomWorld) {
  await this.page!.click('[data-testid="dashboard-link"]');
  await this.page!.waitForLoadState('networkidle');
});

When('I click on the profile link', async function (this: CustomWorld) {
  await this.page!.click('[data-testid="profile-link"]');
  await this.page!.waitForLoadState('networkidle');
});

When('I click on the settings link', async function (this: CustomWorld) {
  await this.page!.click('[data-testid="settings-link"]');
  await this.page!.waitForLoadState('networkidle');
});

When('I navigate to the profile page', async function (this: CustomWorld) {
  await this.page!.click('[data-testid="profile-link"]');
  await this.page!.waitForLoadState('networkidle');
});

When('I click the browser back button', async function (this: CustomWorld) {
  await this.page!.goBack();
  await this.page!.waitForLoadState('networkidle');
});

When('I navigate to the settings page', async function (this: CustomWorld) {
  await this.page!.click('[data-testid="settings-link"]');
  await this.page!.waitForLoadState('networkidle');
});

When('I click on the dashboard breadcrumb', async function (this: CustomWorld) {
  await this.page!.click('[data-testid="breadcrumb-dashboard"]');
  await this.page!.waitForLoadState('networkidle');
});

When('I am using a mobile device', async function (this: CustomWorld) {
  // Simulate mobile viewport
  await this.page!.setViewportSize({ width: 375, height: 667 });
});

When('I click the mobile menu toggle', async function (this: CustomWorld) {
  await this.page!.click('[data-testid="mobile-menu-toggle"]');
});

Then('I should be on the dashboard page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/dashboard');
});

Then('I should see the dashboard title', async function (this: CustomWorld) {
  const title = await this.page!.textContent('[data-testid="dashboard-title"]');
  expect(title).to.not.be.empty;
});

Then('I should be on the profile page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/profile');
});

Then('I should see my profile information', async function (this: CustomWorld) {
  const profileInfo = await this.page!.isVisible('[data-testid="profile-info"]');
  expect(profileInfo).to.be.true;
});

Then('I should be on the settings page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/settings');
});

Then('I should see the settings options', async function (this: CustomWorld) {
  const settingsOptions = await this.page!.isVisible('[data-testid="settings-options"]');
  expect(settingsOptions).to.be.true;
});

Then('I should return to the dashboard page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/dashboard');
});

Then('I should see the mobile navigation menu', async function (this: CustomWorld) {
  const mobileMenu = await this.page!.isVisible('[data-testid="mobile-menu"]');
  expect(mobileMenu).to.be.true;
});

Then('I should be able to navigate to different sections', async function (this: CustomWorld) {
  // Test navigation to different sections from mobile menu
  await this.page!.click('[data-testid="mobile-dashboard-link"]');
  await this.page!.waitForLoadState('networkidle');
  
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/dashboard');
});
