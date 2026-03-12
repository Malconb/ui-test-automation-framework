import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import './common-actions.steps'; // Import common actions

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
