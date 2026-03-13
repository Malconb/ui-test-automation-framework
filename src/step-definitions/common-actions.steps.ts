import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import getLogger from '../utils/logger';

const logger = getLogger();

// Common form actions
When(
  'I enter {string} on {string} field',
  async function (this: CustomWorld, value: string, fieldName: string) {
    logger.info(`Entering value "${value}" in field "${fieldName}"`);

    // Check if the value is an environment variable reference
    let actualValue = value;
    if (process.env[value]) {
      actualValue = process.env[value]!;
      logger.info(`Using environment variable: ${value} = ${actualValue}`);
    }

    // Use field mapping for common field names
    const fieldMapping: { [key: string]: string } = {
      username: '#user-name',
      'user-name': '#user-name',
      password: '#password',
      email: '#email',
      name: '#name',
      firstname: '#firstname',
      lastname: '#lastname',
      phone: '#phone',
      address: '#address',
      city: '#city',
      zip: '#zip',
      postal: '#postal',
      country: '#country',
    };

    const selector = fieldMapping[fieldName.toLowerCase()] || `#${fieldName}`;
    logger.info(`Using selector: ${selector} for field: ${fieldName}`);

    try {
      await this.page!.fill(selector, actualValue);
      logger.info(`Successfully filled field: ${fieldName}`);
    } catch (error) {
      logger.error(`Failed to fill field ${fieldName}: ${error}`);
      throw error;
    }
  }
);

When(
  'I enter {string} in input {string}',
  async function (this: CustomWorld, value: string, selector: string) {
    logger.info(`Entering value "${value}" in input selector: ${selector}`);

    // Check if the value is an environment variable reference
    let actualValue = value;
    if (process.env[value]) {
      actualValue = process.env[value]!;
      logger.info(`Using environment variable: ${value} = ${actualValue}`);
    }

    try {
      await this.page!.fill(selector, actualValue);
      logger.info(`Successfully filled input: ${selector}`);
    } catch (error) {
      logger.error(`Failed to fill input ${selector}: ${error}`);
      throw error;
    }
  }
);

When('I click on element {string}', async function (this: CustomWorld, selector: string) {
  logger.info(`Clicking on element with selector: ${selector}`);
  try {
    await this.page!.click(selector);
    logger.info(`Successfully clicked element: ${selector}`);
  } catch (error) {
    logger.error(`Failed to click element ${selector}: ${error}`);
    throw error;
  }
});

When('I click {string} button', async function (this: CustomWorld, buttonName: string) {
  logger.info(`Clicking button: ${buttonName}`);
  const buttonNameLower = buttonName.toLowerCase();

  try {
    // Login page buttons
    if (['login', 'signin', 'sign-in', 'submit'].includes(buttonNameLower)) {
      logger.info(`Identified as login button: ${buttonName}`);
      const { LoginPage } = await import('../page-objects/login-page/login.page');
      const loginPage = new LoginPage(this.page!, this.baseUrl);
      await loginPage.clickElement(loginPage.loginButton);
    }
    // Cart page buttons
    else if (['add to cart', 'addtocart'].includes(buttonNameLower)) {
      logger.info(`Identified as add to cart button: ${buttonName}`);
      const { CartPage } = await import('../page-objects/cart-page/cart.page');
      const cartPage = new CartPage(this.page!, this.baseUrl);
      await cartPage.addToCart();
    } else if (buttonNameLower === 'cart') {
      logger.info(`Navigating to cart`);
      const { CartPage } = await import('../page-objects/cart-page/cart.page');
      const cartPage = new CartPage(this.page!, this.baseUrl);
      await cartPage.goToCart();
    } else if (buttonNameLower === 'checkout') {
      logger.info(`Proceeding to checkout`);
      const { CartPage } = await import('../page-objects/cart-page/cart.page');
      const cartPage = new CartPage(this.page!, this.baseUrl);
      await cartPage.proceedToCheckout();
    } else if (buttonNameLower === 'continue') {
      logger.info(`Continuing shopping`);
      const { CartPage } = await import('../page-objects/cart-page/cart.page');
      const cartPage = new CartPage(this.page!, this.baseUrl);
      await cartPage.continueShopping();
    }
    // Navigation buttons
    else if (buttonNameLower === 'menu') {
      logger.info(`Opening menu`);
      const { NavigationPage } = await import('../page-objects/navigation.page');
      const navPage = new NavigationPage(this.page!, this.baseUrl);
      await navPage.openMenu();
    } else if (buttonNameLower === 'logout') {
      logger.info(`Logging out`);
      const { NavigationPage } = await import('../page-objects/navigation.page');
      const navPage = new NavigationPage(this.page!, this.baseUrl);
      await navPage.logout();
    } else if (buttonNameLower === 'reset') {
      logger.info(`Resetting app state`);
      const { NavigationPage } = await import('../page-objects/navigation.page');
      const navPage = new NavigationPage(this.page!, this.baseUrl);
      await navPage.resetAppState();
    }
    // Fallback for unknown buttons
    else {
      logger.warn(`Unknown button type, using fallback selector for: ${buttonName}`);
      const selector = `button:has-text("${buttonName}")`;
      await this.page!.click(selector);
    }
    logger.info(`Successfully clicked button: ${buttonName}`);
  } catch (error) {
    logger.error(`Failed to click button ${buttonName}: ${error}`);
    throw error;
  }
});

// Natural language inventory actions
When('I add {string} to cart', async function (this: CustomWorld, productName: string) {
  logger.info(`Adding product to cart: ${productName}`);
  try {
    const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
    const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
    await inventoryPage.addProductToCart(productName);
    logger.info(`Successfully added product to cart: ${productName}`);
  } catch (error) {
    logger.error(`Failed to add product to cart ${productName}: ${error}`);
    throw error;
  }
});

When('I add Sauce Labs Backpack to cart', async function (this: CustomWorld) {
  logger.info('Adding Sauce Labs Backpack to cart');
  try {
    const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
    const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
    await inventoryPage.addSauceLabsBackpackToCart();
    logger.info('Successfully added Sauce Labs Backpack to cart');
  } catch (error) {
    logger.error(`Failed to add Sauce Labs Backpack to cart: ${error}`);
    throw error;
  }
});

When('I add Sauce Labs Bike Light to cart', async function (this: CustomWorld) {
  logger.info('Adding Sauce Labs Bike Light to cart');
  try {
    const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
    const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
    await inventoryPage.addSauceLabsBikeLightToCart();
    logger.info('Successfully added Sauce Labs Bike Light to cart');
  } catch (error) {
    logger.error(`Failed to add Sauce Labs Bike Light to cart: ${error}`);
    throw error;
  }
});

When('I add Sauce Labs Bolt T-Shirt to cart', async function (this: CustomWorld) {
  logger.info('Adding Sauce Labs Bolt T-Shirt to cart');
  try {
    const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
    const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
    await inventoryPage.addSauceLabsBoltTShirtToCart();
    logger.info('Successfully added Sauce Labs Bolt T-Shirt to cart');
  } catch (error) {
    logger.error(`Failed to add Sauce Labs Bolt T-Shirt to cart: ${error}`);
    throw error;
  }
});

When('I add the first product to cart', async function (this: CustomWorld) {
  logger.info('Adding the first product to cart');
  try {
    const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
    const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
    await inventoryPage.addFirstProductToCart();
    logger.info('Successfully added the first product to cart');
  } catch (error) {
    logger.error(`Failed to add the first product to cart: ${error}`);
    throw error;
  }
});

When('I sort products by name A to Z', async function (this: CustomWorld) {
  logger.info('Sorting products by name (A to Z)');
  try {
    const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
    const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
    await inventoryPage.sortByNameAscending();
    logger.info('Successfully sorted products by name (A to Z)');
  } catch (error) {
    logger.error(`Failed to sort products by name: ${error}`);
    throw error;
  }
});

When('I sort products by price low to high', async function (this: CustomWorld) {
  logger.info('Sorting products by price (low to high)');
  try {
    const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
    const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
    await inventoryPage.sortByPriceAscending();
    logger.info('Successfully sorted products by price (low to high)');
  } catch (error) {
    logger.error(`Failed to sort products by price: ${error}`);
    throw error;
  }
});

When(
  'I wait for element {string} to be visible',
  async function (this: CustomWorld, elementName: string) {
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

    logger.info(`Waiting for element to be visible: ${selector}`);
    try {
      await this.page!.waitForSelector(selector, { state: 'visible' });
      logger.info(`Element became visible: ${selector}`);
    } catch (error) {
      logger.error(`Element did not become visible: ${selector} - ${error}`);
      throw error;
    }
  }
);

When(
  'I wait for element {string} to be hidden',
  async function (this: CustomWorld, elementName: string) {
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

    logger.info(`Waiting for element to be hidden: ${selector}`);
    try {
      await this.page!.waitForSelector(selector, { state: 'hidden' });
      logger.info(`Element became hidden: ${selector}`);
    } catch (error) {
      logger.error(`Element did not become hidden: ${selector} - ${error}`);
      throw error;
    }
  }
);

When('I fill checkout information with {string}, {string}, {string}', async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
  logger.info(`Filling checkout information: ${firstName} ${lastName}, ${postalCode}`);
  try {
    const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
    const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
    await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
    logger.info('Successfully filled checkout information');
  } catch (error) {
    logger.error(`Failed to fill checkout information: ${error}`);
    throw error;
  }
});

When('I continue checkout', async function (this: CustomWorld) {
  logger.info('Continuing checkout process');
  try {
    const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
    const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
    await checkoutPage.continueCheckout();
    logger.info('Successfully continued checkout');
  } catch (error) {
    logger.error(`Failed to continue checkout: ${error}`);
    throw error;
  }
});

When('I finish checkout', async function (this: CustomWorld) {
  logger.info('Finishing checkout process');
  try {
    const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
    const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
    await checkoutPage.finishCheckout();
    logger.info('Successfully finished checkout');
  } catch (error) {
    logger.error(`Failed to finish checkout: ${error}`);
    throw error;
  }
});

When('I cancel checkout', async function (this: CustomWorld) {
  logger.info('Canceling checkout process');
  try {
    const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
    const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
    await checkoutPage.cancelCheckout();
    logger.info('Successfully canceled checkout');
  } catch (error) {
    logger.error(`Failed to cancel checkout: ${error}`);
    throw error;
  }
});

When('I go back to products', async function (this: CustomWorld) {
  logger.info('Going back to products page');
  try {
    const { CheckoutPage } = await import('../page-objects/checkout-page/checkout.page');
    const checkoutPage = new CheckoutPage(this.page!, this.baseUrl);
    await checkoutPage.backToProducts();
    logger.info('Successfully navigated back to products');
  } catch (error) {
    logger.error(`Failed to go back to products: ${error}`);
    throw error;
  }
});

// Network actions
When('there is a network connection issue', async function (this: CustomWorld) {
  logger.info('Simulating network connection issue');
  try {
    await this.page!.context().setOffline(true);
    logger.info('Network connection disabled');
  } catch (error) {
    logger.error(`Failed to disable network connection: ${error}`);
    throw error;
  }
});

When('network connection is restored', async function (this: CustomWorld) {
  logger.info('Restoring network connection');
  try {
    await this.page!.context().setOffline(false);
    logger.info('Network connection restored');
  } catch (error) {
    logger.error(`Failed to restore network connection: ${error}`);
    throw error;
  }
});
