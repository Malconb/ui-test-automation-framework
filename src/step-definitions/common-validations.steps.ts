import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import './common-actions.steps'; // Import common actions

// Element visibility validations
Then('I should see element {string}', async function (this: CustomWorld, selector: string) {
  const isVisible = await this.page!.isVisible(selector);
  expect(isVisible).to.be.true;
});

Then('I should not see element {string}', async function (this: CustomWorld, selector: string) {
  const isVisible = await this.page!.isVisible(selector);
  expect(isVisible).to.be.false;
});

// Element state validations
Then('element {string} should be enabled', async function (this: CustomWorld, selector: string) {
  const isEnabled = await this.page!.isEnabled(selector);
  expect(isEnabled).to.be.true;
});

Then('element {string} should be disabled', async function (this: CustomWorld, selector: string) {
  const isEnabled = await this.page!.isEnabled(selector);
  expect(isEnabled).to.be.false;
});

// Text content validations
Then('I should see text {string} in element {string}', async function (this: CustomWorld, expectedText: string, selector: string) {
  const text = await this.page!.textContent(selector);
  expect(text).to.include(expectedText);
});

Then('I should see text containing {string}', async function (this: CustomWorld, expectedText: string) {
  const pageText = await this.page!.textContent('body');
  expect(pageText).to.include(expectedText);
});

Then('I should see the products title', async function (this: CustomWorld) {
  const pageText = await this.page!.textContent('body');
  expect(pageText).to.include('Products');
});

// Navigation validations
Then('I should be on page containing {string}', async function (this: CustomWorld, urlFragment: string) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include(urlFragment);
});

Then('I should be redirected to {string} page', async function (this: CustomWorld, pageName: string) {
  const pageUrls: { [key: string]: string } = {
    'inventory': '/inventory.html',
    'products': '/inventory.html',
    'cart': '/cart.html',
    'checkout': '/checkout-step-one.html',
    'checkout-step-one': '/checkout-step-one.html',
    'checkout-step-two': '/checkout-step-two.html',
    'checkout-complete': '/checkout-complete.html',
    'login': '',
    'home': ''
  };
  
  const expectedUrlFragment = pageUrls[pageName.toLowerCase()] || pageName.toLowerCase();
  
  // Wait for navigation to complete
  await this.page!.waitForLoadState('networkidle');
  
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include(expectedUrlFragment);
});

// Element count validations
Then('I should see at least {int} product items', async function (this: CustomWorld, minCount: number) {
  const items = await this.page!.$$('.inventory_item');
  expect(items.length).to.be.at.least(minCount);
});

Then('I should see product names for all items', async function (this: CustomWorld) {
  const names = await this.page!.$$eval('.inventory_item_name', elements => 
    elements.map(el => el.textContent?.trim()).filter(text => text !== '')
  );
  expect(names.length).to.be.greaterThan(0);
  expect(names.every(name => name.length > 0)).to.be.true;
});

Then('I should see product prices for all items', async function (this: CustomWorld) {
  const prices = await this.page!.$$eval('.inventory_item_price', elements => 
    elements.map(el => el.textContent?.trim()).filter(text => text !== '')
  );
  expect(prices.length).to.be.greaterThan(0);
  expect(prices.every(price => price.includes('$'))).to.be.true;
});

Then('I should see products sorted alphabetically', async function (this: CustomWorld) {
  const names = await this.page!.$$eval('.inventory_item_name', elements => 
    elements.map(el => el.textContent || '').sort()
  );
  const actualNames = await this.page!.$$eval('.inventory_item_name', elements => 
    elements.map(el => el.textContent || '')
  );
  expect(actualNames).to.deep.equal(names);
});

Then('I should see products sorted by price ascending', async function (this: CustomWorld) {
  const prices = await this.page!.$$eval('.inventory_item_price', elements => 
    elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0')).sort((a, b) => a - b)
  );
  const actualPrices = await this.page!.$$eval('.inventory_item_price', elements => 
    elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
  );
  expect(actualPrices).to.deep.equal(prices);
});

Then('I should see text containing {string} in element {string}', async function (this: CustomWorld, expectedText: string, selector: string) {
  const text = await this.page!.textContent(selector);
  expect(text).to.include(expectedText);
});

Then('I should not be on page containing {string}', async function (this: CustomWorld, urlFragment: string) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.not.include(urlFragment);
});

// Error and validation message validations
Then('I should see an error message', async function (this: CustomWorld) {
  const errorElements = await this.page!.$$('[data-test="error"], .error, .error-message, [role="alert"]');
  expect(errorElements.length).to.be.greaterThan(0);
});

Then('I should see validation errors', async function (this: CustomWorld) {
  const validationErrors = await this.page!.$$('[data-test*="error"], .error, .error-message, [role="alert"]');
  expect(validationErrors.length).to.be.greaterThan(0);
});

// Existing dashboard validations
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
