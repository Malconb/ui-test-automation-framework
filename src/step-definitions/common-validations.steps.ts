import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import getLogger from '../utils/logger';
import './common-actions.steps'; // Import common actions

const logger = getLogger();

// Element visibility validations
Then('I should see element {string}', async function (this: CustomWorld, selector: string) {
  logger.info(`Checking if element is visible: ${selector}`);
  try {
    const isVisible = await this.page!.isVisible(selector);
    expect(isVisible).to.be.true;
    logger.info(`Element is visible: ${selector}`);
  } catch (error) {
    logger.error(`Element is not visible: ${selector} - ${error}`);
    throw error;
  }
});

Then('I should not see element {string}', async function (this: CustomWorld, selector: string) {
  logger.info(`Checking if element is not visible: ${selector}`);
  try {
    const isVisible = await this.page!.isVisible(selector);
    expect(isVisible).to.be.false;
    logger.info(`Element is correctly not visible: ${selector}`);
  } catch (error) {
    logger.error(`Element is visible when it should not be: ${selector} - ${error}`);
    throw error;
  }
});

// Element state validations
Then('element {string} should be enabled', async function (this: CustomWorld, selector: string) {
  logger.info(`Checking if element is enabled: ${selector}`);
  try {
    const isEnabled = await this.page!.isEnabled(selector);
    expect(isEnabled).to.be.true;
    logger.info(`Element is enabled: ${selector}`);
  } catch (error) {
    logger.error(`Element is not enabled: ${selector} - ${error}`);
    throw error;
  }
});

Then('element {string} should be disabled', async function (this: CustomWorld, selector: string) {
  logger.info(`Checking if element is disabled: ${selector}`);
  try {
    const isEnabled = await this.page!.isEnabled(selector);
    expect(isEnabled).to.be.false;
    logger.info(`Element is correctly disabled: ${selector}`);
  } catch (error) {
    logger.error(`Element is enabled when it should be disabled: ${selector} - ${error}`);
    throw error;
  }
});

// Text content validations
Then('I should see text {string} in element {string}', async function (this: CustomWorld, expectedText: string, selector: string) {
  logger.info(`Checking for text "${expectedText}" in element: ${selector}`);
  try {
    const text = await this.page!.textContent(selector);
    expect(text).to.include(expectedText);
    logger.info(`Found expected text "${expectedText}" in element: ${selector}`);
  } catch (error) {
    const actualText = await this.page!.textContent(selector);
    logger.error(`Text "${expectedText}" not found in element ${selector}. Actual text: "${actualText}" - ${error}`);
    throw error;
  }
});

Then('I should see text containing {string}', async function (this: CustomWorld, expectedText: string) {
  logger.info(`Checking for text containing "${expectedText}" on page`);
  try {
    const pageText = await this.page!.textContent('body');
    expect(pageText).to.include(expectedText);
    logger.info(`Found expected text "${expectedText}" on page`);
  } catch (error) {
    logger.error(`Text "${expectedText}" not found on page - ${error}`);
    throw error;
  }
});

Then('I should see the products title', async function (this: CustomWorld) {
  logger.info('Checking for Products title on page');
  try {
    const pageText = await this.page!.textContent('body');
    expect(pageText).to.include('Products');
    logger.info('Found Products title on page');
  } catch (error) {
    logger.error('Products title not found on page - ${error}');
    throw error;
  }
});

// Navigation validations
Then('I should be on page containing {string}', async function (this: CustomWorld, urlFragment: string) {
  logger.info(`Checking if current URL contains: ${urlFragment}`);
  try {
    const currentUrl = this.page!.url();
    expect(currentUrl).to.include(urlFragment);
    logger.info(`Current URL "${currentUrl}" contains expected fragment: ${urlFragment}`);
  } catch (error) {
    const actualUrl = this.page!.url();
    logger.error(`URL does not contain expected fragment "${urlFragment}". Actual URL: "${actualUrl}" - ${error}`);
    throw error;
  }
});

Then('I should be redirected to {string} page', async function (this: CustomWorld, pageName: string) {
  logger.info(`Checking if redirected to page: ${pageName}`);
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
  
  try {
    // Wait for navigation to complete
    await this.page!.waitForLoadState('networkidle');
    
    const currentUrl = this.page!.url();
    expect(currentUrl).to.include(expectedUrlFragment);
    logger.info(`Successfully redirected to ${pageName} page. URL: ${currentUrl}`);
  } catch (error) {
    const actualUrl = this.page!.url();
    logger.error(`Not redirected to expected page "${pageName}". Expected fragment: "${expectedUrlFragment}", Actual URL: "${actualUrl}" - ${error}`);
    throw error;
  }
});

// Element count validations
Then('I should see at least {int} product items', async function (this: CustomWorld, minCount: number) {
  logger.info(`Checking for at least ${minCount} product items`);
  try {
    const items = await this.page!.$$('.inventory_item');
    expect(items.length).to.be.at.least(minCount);
    logger.info(`Found ${items.length} product items (expected at least ${minCount})`);
  } catch (error) {
    const actualCount = (await this.page!.$$('.inventory_item')).length;
    logger.error(`Found only ${actualCount} product items, expected at least ${minCount} - ${error}`);
    throw error;
  }
});

Then('I should see product names for all items', async function (this: CustomWorld) {
  logger.info('Checking product names for all items');
  try {
    const names = await this.page!.$$eval('.inventory_item_name', elements => 
      elements.map(el => el.textContent?.trim()).filter(text => text !== '')
    );
    expect(names.length).to.be.greaterThan(0);
    expect(names.every(name => name.length > 0)).to.be.true;
    logger.info(`Found product names for all ${names.length} items: ${names.join(', ')}`);
  } catch (error) {
    logger.error(`Missing or empty product names - ${error}`);
    throw error;
  }
});

Then('I should see product prices for all items', async function (this: CustomWorld) {
  logger.info('Checking product prices for all items');
  try {
    const prices = await this.page!.$$eval('.inventory_item_price', elements => 
      elements.map(el => el.textContent?.trim()).filter(text => text !== '')
    );
    expect(prices.length).to.be.greaterThan(0);
    expect(prices.every(price => price.includes('$'))).to.be.true;
    logger.info(`Found valid prices for all ${prices.length} items: ${prices.join(', ')}`);
  } catch (error) {
    logger.error(`Missing or invalid product prices - ${error}`);
    throw error;
  }
});

Then('I should see products sorted alphabetically', async function (this: CustomWorld) {
  logger.info('Checking if products are sorted alphabetically');
  try {
    const names = await this.page!.$$eval('.inventory_item_name', elements => 
      elements.map(el => el.textContent || '').sort()
    );
    const actualNames = await this.page!.$$eval('.inventory_item_name', elements => 
      elements.map(el => el.textContent || '')
    );
    expect(actualNames).to.deep.equal(names);
    logger.info(`Products are correctly sorted alphabetically: ${actualNames.join(', ')}`);
  } catch (error) {
    logger.error(`Products are not sorted alphabetically - ${error}`);
    throw error;
  }
});

Then('I should see products sorted by price ascending', async function (this: CustomWorld) {
  logger.info('Checking if products are sorted by price ascending');
  try {
    const prices = await this.page!.$$eval('.inventory_item_price', elements => 
      elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0')).sort((a, b) => a - b)
    );
    const actualPrices = await this.page!.$$eval('.inventory_item_price', elements => 
      elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
    );
    expect(actualPrices).to.deep.equal(prices);
    logger.info(`Products are correctly sorted by price ascending: ${actualPrices.join(', ')}`);
  } catch (error) {
    logger.error(`Products are not sorted by price ascending - ${error}`);
    throw error;
  }
});

Then('I should see text containing {string} in element {string}', async function (this: CustomWorld, expectedText: string, selector: string) {
  logger.info(`Checking for text "${expectedText}" in element: ${selector}`);
  try {
    const text = await this.page!.textContent(selector);
    expect(text).to.include(expectedText);
    logger.info(`Found expected text "${expectedText}" in element: ${selector}`);
  } catch (error) {
    const actualText = await this.page!.textContent(selector);
    logger.error(`Text "${expectedText}" not found in element ${selector}. Actual text: "${actualText}" - ${error}`);
    throw error;
  }
});

Then('I should not be on page containing {string}', async function (this: CustomWorld, urlFragment: string) {
  logger.info(`Checking if current URL does NOT contain: ${urlFragment}`);
  try {
    const currentUrl = this.page!.url();
    expect(currentUrl).to.not.include(urlFragment);
    logger.info(`Current URL "${currentUrl}" correctly does not contain: ${urlFragment}`);
  } catch (error) {
    const actualUrl = this.page!.url();
    logger.error(`URL unexpectedly contains forbidden fragment "${urlFragment}". Actual URL: "${actualUrl}" - ${error}`);
    throw error;
  }
});

// Error and validation message validations
Then('I should see an error message', async function (this: CustomWorld) {
  logger.info('Checking for error message on page');
  try {
    const errorElements = await this.page!.$$('[data-test="error"], .error, .error-message, [role="alert"]');
    expect(errorElements.length).to.be.greaterThan(0);
    logger.info(`Found ${errorElements.length} error message(s) on page`);
  } catch (error) {
    logger.error(`No error message found on page - ${error}`);
    throw error;
  }
});

Then('I should see validation errors', async function (this: CustomWorld) {
  logger.info('Checking for validation errors on page');
  try {
    const validationErrors = await this.page!.$$('[data-test*="error"], .error, .error-message, [role="alert"]');
    expect(validationErrors.length).to.be.greaterThan(0);
    logger.info(`Found ${validationErrors.length} validation error(s) on page`);
  } catch (error) {
    logger.error(`No validation errors found on page - ${error}`);
    throw error;
  }
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
