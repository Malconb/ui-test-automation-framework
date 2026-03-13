import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import getLogger from '../utils/logger';
import './common-actions.steps'; // Import common actions

const logger = getLogger();

// Element visibility validations
Then(
  'I should {word} element {string}',
  async function (this: CustomWorld, visibility: string, elementName: string) {
    let selector = elementName;
    
    // Check if elementName matches any fieldMapping in page objects
    const { CartPage } = await import('../page-objects/cart-page/cart.page');
    const cartPage = new CartPage(this.page!, this.baseUrl);
    if (elementName in cartPage.fieldMapping) {
      const mappedValue = cartPage.fieldMapping[elementName as keyof typeof cartPage.fieldMapping];
      if (typeof mappedValue === 'string') {
        selector = mappedValue;
        logger.info(`Using CartPage mapped selector for "${elementName}": ${selector}`);
      } else {
        logger.warn(`CartPage mapped value for "${elementName}" is a function, not a string selector`);
      }
    } else {
      // Check LoginPage mapping
      const { LoginPage } = await import('../page-objects/login-page/login.page');
      const loginPage = new LoginPage(this.page!, this.baseUrl);
      if (elementName in loginPage.fieldMapping) {
        const mappedValue = loginPage.fieldMapping[elementName as keyof typeof loginPage.fieldMapping];
        if (typeof mappedValue === 'string') {
          selector = mappedValue;
          logger.info(`Using LoginPage mapped selector for "${elementName}": ${selector}`);
        } else {
          logger.warn(`LoginPage mapped value for "${elementName}" is a function, not a string selector`);
        }
      } else {
        // Check InventoryPage mapping
        const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
        const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
        if (elementName in inventoryPage.fieldMapping) {
          const mappedValue = inventoryPage.fieldMapping[elementName as keyof typeof inventoryPage.fieldMapping];
          if (typeof mappedValue === 'string') {
            selector = mappedValue;
            logger.info(`Using InventoryPage mapped selector for "${elementName}": ${selector}`);
          } else {
            logger.warn(`InventoryPage mapped value for "${elementName}" is a function, not a string selector`);
          }
        } else {
          // Check NavigationPage mapping
          const { NavigationPage } = await import('../page-objects/navigation.page');
          const navigationPage = new NavigationPage(this.page!, this.baseUrl);
          if (elementName in navigationPage.fieldMapping) {
            const mappedValue = navigationPage.fieldMapping[elementName as keyof typeof navigationPage.fieldMapping];
            if (typeof mappedValue === 'string') {
              selector = mappedValue;
              logger.info(`Using NavigationPage mapped selector for "${elementName}": ${selector}`);
            } else {
              logger.warn(`NavigationPage mapped value for "${elementName}" is a function, not a string selector`);
            }
          } else {
            // Check CheckoutPage mapping
            const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
            const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
            if (elementName in checkoutPage.fieldMapping) {
              const mappedValue = checkoutPage.fieldMapping[elementName as keyof typeof checkoutPage.fieldMapping];
              if (typeof mappedValue === 'string') {
                selector = mappedValue;
                logger.info(`Using CheckoutPage mapped selector for "${elementName}": ${selector}`);
              } else {
                logger.warn(`CheckoutPage mapped value for "${elementName}" is a function, not a string selector`);
              }
            }
          }
        }
      }
    }

    const isVisible = await this.page!.isVisible(selector);
    const shouldSee = visibility === 'see';

    logger.info(`Checking if element is ${shouldSee ? 'visible' : 'not visible'}: ${selector}`);
    expect(isVisible).to.equal(shouldSee);
    logger.info(`Element is ${isVisible ? 'visible' : 'not visible'}: ${selector}`);
  }
);

// Element state validations
Then(
  'element {string} should be {word}',
  async function (this: CustomWorld, selector: string, state: string) {
    const isEnabled = await this.page!.isEnabled(selector);
    const shouldBeEnabled = state === 'enabled';

    logger.info(`Checking if element is ${shouldBeEnabled ? 'enabled' : 'disabled'}: ${selector}`);
    expect(isEnabled).to.equal(shouldBeEnabled);
    logger.info(`Element is ${isEnabled ? 'enabled' : 'disabled'}: ${selector}`);
  }
);

// Text content validations
Then(
  'I should {word} text {string} {word} element {string}',
  async function (
    this: CustomWorld,
    action: string,
    expectedText: string,
    preposition: string,
    elementName: string
  ) {
    const shouldContain = action === 'see';
    const inElement = preposition === 'in';
    
    let selector = elementName;
    
    // Check if elementName matches any fieldMapping in page objects
    const { CartPage } = await import('../page-objects/cart-page/cart.page');
    const cartPage = new CartPage(this.page!, this.baseUrl);
    if (elementName in cartPage.fieldMapping) {
      const mappedValue = cartPage.fieldMapping[elementName as keyof typeof cartPage.fieldMapping];
      if (typeof mappedValue === 'string') {
        selector = mappedValue;
        logger.info(`Using CartPage mapped selector for "${elementName}": ${selector}`);
      }
    } else {
      // Check LoginPage mapping
      const { LoginPage } = await import('../page-objects/login-page/login.page');
      const loginPage = new LoginPage(this.page!, this.baseUrl);
      if (elementName in loginPage.fieldMapping) {
        const mappedValue = loginPage.fieldMapping[elementName as keyof typeof loginPage.fieldMapping];
        if (typeof mappedValue === 'string') {
          selector = mappedValue;
          logger.info(`Using LoginPage mapped selector for "${elementName}": ${selector}`);
        }
      } else {
        // Check InventoryPage mapping
        const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
        const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
        if (elementName in inventoryPage.fieldMapping) {
          const mappedValue = inventoryPage.fieldMapping[elementName as keyof typeof inventoryPage.fieldMapping];
          if (typeof mappedValue === 'string') {
            selector = mappedValue;
            logger.info(`Using InventoryPage mapped selector for "${elementName}": ${selector}`);
          }
        } else {
          // Check NavigationPage mapping
          const { NavigationPage } = await import('../page-objects/navigation.page');
          const navigationPage = new NavigationPage(this.page!, this.baseUrl);
          if (elementName in navigationPage.fieldMapping) {
            const mappedValue = navigationPage.fieldMapping[elementName as keyof typeof navigationPage.fieldMapping];
            if (typeof mappedValue === 'string') {
              selector = mappedValue;
              logger.info(`Using NavigationPage mapped selector for "${elementName}": ${selector}`);
            }
          } else {
            // Check CheckoutPage mapping
            const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
            const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
            if (elementName in checkoutPage.fieldMapping) {
              const mappedValue = checkoutPage.fieldMapping[elementName as keyof typeof checkoutPage.fieldMapping];
              if (typeof mappedValue === 'string') {
                selector = mappedValue;
                logger.info(`Using CheckoutPage mapped selector for "${elementName}": ${selector}`);
              }
            }
          }
        }
      }
    }

    if (inElement) {
      const text = await this.page!.textContent(selector);
      logger.info(
        `Checking for text "${expectedText}" ${shouldContain ? 'in' : 'not in'} element: ${selector}`
      );
      if (shouldContain) {
        expect(text).to.include(expectedText);
      } else {
        expect(text).to.not.include(expectedText);
      }
      logger.info(
        `Text "${expectedText}" ${shouldContain ? 'found' : 'not found'} in element: ${selector}`
      );
    } else {
      const pageText = await this.page!.textContent('body');
      logger.info(`Checking for text "${expectedText}" ${shouldContain ? 'on' : 'not on'} page`);
      if (shouldContain) {
        expect(pageText).to.include(expectedText);
      } else {
        expect(pageText).to.not.include(expectedText);
      }
      logger.info(`Text "${expectedText}" ${shouldContain ? 'found' : 'not found'} on page`);
    }
  }
);

// Navigation validations
Then(
  'I should be on page containing {string}',
  async function (this: CustomWorld, urlFragment: string) {
    logger.info(`Checking if current URL contains: ${urlFragment}`);
    try {
      const currentUrl = this.page!.url();
      expect(currentUrl).to.include(urlFragment);
      logger.info(`Current URL "${currentUrl}" contains expected fragment: ${urlFragment}`);
    } catch (error) {
      const actualUrl = this.page!.url();
      logger.error(
        `URL does not contain expected fragment "${urlFragment}". Actual URL: "${actualUrl}" - ${error}`
      );
      throw error;
    }
  }
);

Then(
  'I should see text {string} on page',
  async function (this: CustomWorld, expectedText: string) {
    const pageText = await this.page!.textContent('body');
    expect(pageText).to.include(expectedText);
  }
);

Then(
  'I should be redirected to {string} page',
  async function (this: CustomWorld, pageName: string) {
    logger.info(`Checking if redirected to page: ${pageName}`);
    const pageUrls: { [key: string]: string } = {
      inventory: '/inventory.html',
      products: '/inventory.html',
      cart: '/cart.html',
      checkout: '/checkout-step-one.html',
      'checkout-step-one': '/checkout-step-one.html',
      'checkout-step-two': '/checkout-step-two.html',
      'checkout-complete': '/checkout-complete.html',
      login: '',
      home: '',
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
      logger.error(
        `Not redirected to expected page "${pageName}". Expected fragment: "${expectedUrlFragment}", Actual URL: "${actualUrl}" - ${error}`
      );
      throw error;
    }
  }
);

// Element count validations
Then(
  'I should see at least {int} product items',
  async function (this: CustomWorld, minCount: number) {
    logger.info(`Checking for at least ${minCount} product items`);
    try {
      const items = await this.page!.$$('.inventory_item');
      expect(items.length).to.be.at.least(minCount);
      logger.info(`Found ${items.length} product items (expected at least ${minCount})`);
    } catch (error) {
      const actualCount = (await this.page!.$$('.inventory_item')).length;
      logger.error(
        `Found only ${actualCount} product items, expected at least ${minCount} - ${error}`
      );
      throw error;
    }
  }
);

Then('I should see product names for all items', async function (this: CustomWorld) {
  logger.info('Checking product names for all items');
  try {
    const names = await this.page!.$$eval('.inventory_item_name', elements =>
      elements.map(el => el.textContent?.trim()).filter(text => text !== '')
    );
    expect(names.length).to.be.greaterThan(0);
    expect(
      names.every(name => name.length > 0),
      'All product names should have length > 0'
    ).to.equal(true);
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
    expect(
      prices.every(price => price.includes('$')),
      'All prices should contain $ symbol'
    ).to.equal(true);
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

Then(
  'I should see text containing {string} in element {string}',
  async function (this: CustomWorld, expectedText: string, selector: string) {
    logger.info(`Checking for text "${expectedText}" in element: ${selector}`);
    try {
      const text = await this.page!.textContent(selector);
      expect(text).to.include(expectedText);
      logger.info(`Found expected text "${expectedText}" in element: ${selector}`);
    } catch (error) {
      const actualText = await this.page!.textContent(selector);
      logger.error(
        `Text "${expectedText}" not found in element ${selector}. Actual text: "${actualText}" - ${error}`
      );
      throw error;
    }
  }
);

Then(
  'I should not be on page containing {string}',
  async function (this: CustomWorld, urlFragment: string) {
    logger.info(`Checking if current URL does NOT contain: ${urlFragment}`);
    try {
      const currentUrl = this.page!.url();
      expect(currentUrl).to.not.include(urlFragment);
      logger.info(`Current URL "${currentUrl}" correctly does not contain: ${urlFragment}`);
    } catch (error) {
      const actualUrl = this.page!.url();
      logger.error(
        `URL unexpectedly contains forbidden fragment "${urlFragment}". Actual URL: "${actualUrl}" - ${error}`
      );
      throw error;
    }
  }
);

Then(
  'I should not see text {string} in element {string}',
  async function (this: CustomWorld, expectedText: string, elementName: string) {
    let selector = elementName;
    
    // Check if elementName matches any fieldMapping in page objects
    const { CartPage } = await import('../page-objects/cart-page/cart.page');
    const cartPage = new CartPage(this.page!, this.baseUrl);
    if (elementName in cartPage.fieldMapping) {
      const mappedValue = cartPage.fieldMapping[elementName as keyof typeof cartPage.fieldMapping];
      if (typeof mappedValue === 'string') {
        selector = mappedValue;
        logger.info(`Using CartPage mapped selector for "${elementName}": ${selector}`);
      }
    } else {
      // Check LoginPage mapping
      const { LoginPage } = await import('../page-objects/login-page/login.page');
      const loginPage = new LoginPage(this.page!, this.baseUrl);
      if (elementName in loginPage.fieldMapping) {
        const mappedValue = loginPage.fieldMapping[elementName as keyof typeof loginPage.fieldMapping];
        if (typeof mappedValue === 'string') {
          selector = mappedValue;
          logger.info(`Using LoginPage mapped selector for "${elementName}": ${selector}`);
        }
      } else {
        // Check InventoryPage mapping
        const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
        const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
        if (elementName in inventoryPage.fieldMapping) {
          const mappedValue = inventoryPage.fieldMapping[elementName as keyof typeof inventoryPage.fieldMapping];
          if (typeof mappedValue === 'string') {
            selector = mappedValue;
            logger.info(`Using InventoryPage mapped selector for "${elementName}": ${selector}`);
          }
        } else {
          // Check NavigationPage mapping
          const { NavigationPage } = await import('../page-objects/navigation.page');
          const navigationPage = new NavigationPage(this.page!, this.baseUrl);
          if (elementName in navigationPage.fieldMapping) {
            const mappedValue = navigationPage.fieldMapping[elementName as keyof typeof navigationPage.fieldMapping];
            if (typeof mappedValue === 'string') {
              selector = mappedValue;
              logger.info(`Using NavigationPage mapped selector for "${elementName}": ${selector}`);
            }
          } else {
            // Check CheckoutPage mapping
            const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
            const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
            if (elementName in checkoutPage.fieldMapping) {
              const mappedValue = checkoutPage.fieldMapping[elementName as keyof typeof checkoutPage.fieldMapping];
              if (typeof mappedValue === 'string') {
                selector = mappedValue;
                logger.info(`Using CheckoutPage mapped selector for "${elementName}": ${selector}`);
              }
            }
          }
        }
      }
    }

    const text = await this.page!.textContent(selector);
    logger.info(`Checking that text "${expectedText}" is NOT in element: ${selector}`);
    expect(text).to.not.include(expectedText);
    logger.info(`Text "${expectedText}" correctly not found in element: ${selector}`);
  }
);

Then(
  'I should not see text {string} on page',
  async function (this: CustomWorld, expectedText: string) {
    const pageText = await this.page!.textContent('body');
    logger.info(`Checking that text "${expectedText}" is NOT on page`);
    expect(pageText).to.not.include(expectedText);
    logger.info(`Text "${expectedText}" correctly not found on page`);
  }
);

// Error and validation message validations
Then('I should see an error message', async function (this: CustomWorld) {
  logger.info('Checking for error message on page');
  try {
    const errorElements = await this.page!.$$(
      '[data-test="error"], .error, .error-message, [role="alert"]'
    );
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
    const validationErrors = await this.page!.$$(
      '[data-test*="error"], .error, .error-message, [role="alert"]'
    );
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
  expect(title, 'Dashboard title should not be empty')
    .to.be.a('string')
    .and.have.length.greaterThan(0);
});

Then('I should be on the profile page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/profile');
});

Then('I should see my profile information', async function (this: CustomWorld) {
  const profileInfo = await this.page!.isVisible('[data-testid="profile-info"]');
  expect(profileInfo, 'Profile information should be visible').to.equal(true);
});

Then('I should be on the settings page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/settings');
});

Then('I should see the settings options', async function (this: CustomWorld) {
  const settingsOptions = await this.page!.isVisible('[data-testid="settings-options"]');
  expect(settingsOptions, 'Settings options should be visible').to.equal(true);
});

Then('I should return to the dashboard page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/dashboard');
});

Then('I should see the mobile navigation menu', async function (this: CustomWorld) {
  const mobileMenu = await this.page!.isVisible('[data-testid="mobile-menu"]');
  expect(mobileMenu, 'Mobile navigation menu should be visible').to.equal(true);
});

Then('I should be able to navigate to different sections', async function (this: CustomWorld) {
  // Test navigation to different sections from mobile menu
  await this.page!.click('[data-testid="mobile-dashboard-link"]');
  await this.page!.waitForLoadState('networkidle');

  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('/dashboard');
});
