import { When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';

// Common form actions
When('I enter {string} in input {string}', async function (this: CustomWorld, value: string, selector: string) {
  await this.page!.fill(selector, value);
});

When('I click on element {string}', async function (this: CustomWorld, selector: string) {
  await this.page!.click(selector);
});

When('I wait for element {string} to be visible', async function (this: CustomWorld, selector: string) {
  await this.page!.waitForSelector(selector, { state: 'visible' });
});

When('I wait for element {string} to be hidden', async function (this: CustomWorld, selector: string) {
  await this.page!.waitForSelector(selector, { state: 'hidden' });
});

// Common validation actions
Then('I should see element {string}', async function (this: CustomWorld, selector: string) {
  const isVisible = await this.page!.isVisible(selector);
  expect(isVisible).to.be.true;
});

Then('I should not see element {string}', async function (this: CustomWorld, selector: string) {
  const isVisible = await this.page!.isVisible(selector);
  expect(isVisible).to.be.false;
});

Then('element {string} should be enabled', async function (this: CustomWorld, selector: string) {
  const isEnabled = await this.page!.isEnabled(selector);
  expect(isEnabled).to.be.true;
});

Then('element {string} should be disabled', async function (this: CustomWorld, selector: string) {
  const isEnabled = await this.page!.isEnabled(selector);
  expect(isEnabled).to.be.false;
});

Then('I should see text {string} in element {string}', async function (this: CustomWorld, expectedText: string, selector: string) {
  const text = await this.page!.textContent(selector);
  expect(text).to.include(expectedText);
});

Then('I should see text containing {string}', async function (this: CustomWorld, expectedText: string) {
  const pageText = await this.page!.textContent('body');
  expect(pageText).to.include(expectedText);
});

// Common navigation actions
Then('I should be on page containing {string}', async function (this: CustomWorld, urlFragment: string) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include(urlFragment);
});

Then('I should not be on page containing {string}', async function (this: CustomWorld, urlFragment: string) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.not.include(urlFragment);
});

// Common error and validation actions
Then('I should see an error message', async function (this: CustomWorld) {
  const errorElements = await this.page!.$$('[data-test="error"], .error, .error-message, [role="alert"]');
  expect(errorElements.length).to.be.greaterThan(0);
});

Then('I should see validation errors', async function (this: CustomWorld) {
  const validationErrors = await this.page!.$$('[data-test*="error"], .error, .error-message, [role="alert"]');
  expect(validationErrors.length).to.be.greaterThan(0);
});

// Network actions
When('there is a network connection issue', async function (this: CustomWorld) {
  await this.page!.context().setOffline(true);
});

When('network connection is restored', async function (this: CustomWorld) {
  await this.page!.context().setOffline(false);
});
