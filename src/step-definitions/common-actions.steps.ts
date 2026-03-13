import { When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';

// Common form actions
When('I enter {string} on {string} field', async function (this: CustomWorld, value: string, fieldName: string) {
  // Check if the value is an environment variable reference
  let actualValue = value;
  if (process.env[value]) {
    actualValue = process.env[value]!;
  }

  // Use field mapping for common field names
  const fieldMapping: { [key: string]: string } = {
    'username': '#user-name',
    'user-name': '#user-name',
    'password': '#password',
    'email': '#email',
    'name': '#name',
    'firstname': '#firstname',
    'lastname': '#lastname',
    'phone': '#phone',
    'address': '#address',
    'city': '#city',
    'zip': '#zip',
    'postal': '#postal',
    'country': '#country'
  };
  
  const selector = fieldMapping[fieldName.toLowerCase()] || `#${fieldName}`;
  await this.page!.fill(selector, actualValue);
});

When('I enter {string} in input {string}', async function (this: CustomWorld, value: string, selector: string) {
  // Check if the value is an environment variable reference
  let actualValue = value;
  if (process.env[value]) {
    actualValue = process.env[value]!;
  }
  await this.page!.fill(selector, actualValue);
});

When('I click on element {string}', async function (this: CustomWorld, selector: string) {
  await this.page!.click(selector);
});

When('I click {string} button', async function (this: CustomWorld, buttonName: string) {
  const buttonNameLower = buttonName.toLowerCase();
  
  // Login page buttons
  if (['login', 'signin', 'sign-in', 'submit'].includes(buttonNameLower)) {
    const { LoginPage } = await import('../page-objects/login-page/login.page');
    const loginPage = new LoginPage(this.page!, this.baseUrl);
    await loginPage.clickElement(loginPage.loginButton);
  }
  // Cart page buttons
  else if (['add to cart', 'addtocart'].includes(buttonNameLower)) {
    const { CartPage } = await import('../page-objects/cart-page/cart.page');
    const cartPage = new CartPage(this.page!, this.baseUrl);
    await cartPage.addToCart();
  }
  else if (buttonNameLower === 'cart') {
    const { CartPage } = await import('../page-objects/cart-page/cart.page');
    const cartPage = new CartPage(this.page!, this.baseUrl);
    await cartPage.goToCart();
  }
  else if (buttonNameLower === 'checkout') {
    const { CartPage } = await import('../page-objects/cart-page/cart.page');
    const cartPage = new CartPage(this.page!, this.baseUrl);
    await cartPage.proceedToCheckout();
  }
  else if (buttonNameLower === 'continue') {
    const { CartPage } = await import('../page-objects/cart-page/cart.page');
    const cartPage = new CartPage(this.page!, this.baseUrl);
    await cartPage.continueShopping();
  }
  // Navigation buttons
  else if (buttonNameLower === 'menu') {
    const { NavigationPage } = await import('../page-objects/navigation.page');
    const navPage = new NavigationPage(this.page!, this.baseUrl);
    await navPage.openMenu();
  }
  else if (buttonNameLower === 'logout') {
    const { NavigationPage } = await import('../page-objects/navigation.page');
    const navPage = new NavigationPage(this.page!, this.baseUrl);
    await navPage.logout();
  }
  else if (buttonNameLower === 'reset') {
    const { NavigationPage } = await import('../page-objects/navigation.page');
    const navPage = new NavigationPage(this.page!, this.baseUrl);
    await navPage.resetAppState();
  }
  // Fallback for unknown buttons
  else {
    const selector = `button:has-text("${buttonName}")`;
    await this.page!.click(selector);
  }
});

// Natural language inventory actions
When('I add {string} to cart', async function (this: CustomWorld, productName: string) {
  const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
  const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
  await inventoryPage.addProductToCart(productName);
});

When('I add Sauce Labs Backpack to cart', async function (this: CustomWorld) {
  const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
  const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
  await inventoryPage.addSauceLabsBackpackToCart();
});

When('I add Sauce Labs Bike Light to cart', async function (this: CustomWorld) {
  const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
  const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
  await inventoryPage.addSauceLabsBikeLightToCart();
});

When('I add Sauce Labs Bolt T-Shirt to cart', async function (this: CustomWorld) {
  const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
  const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
  await inventoryPage.addSauceLabsBoltTShirtToCart();
});

When('I add the first product to cart', async function (this: CustomWorld) {
  const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
  const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
  await inventoryPage.addFirstProductToCart();
});

When('I sort products by name A to Z', async function (this: CustomWorld) {
  const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
  const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
  await inventoryPage.sortByNameAscending();
});

When('I sort products by price low to high', async function (this: CustomWorld) {
  const { InventoryPage } = await import('../page-objects/inventory-page/inventory.page');
  const inventoryPage = new InventoryPage(this.page!, this.baseUrl);
  await inventoryPage.sortByPriceAscending();
});

When('I wait for element {string} to be visible', async function (this: CustomWorld, selector: string) {
  await this.page!.waitForSelector(selector, { state: 'visible' });
});

When('I wait for element {string} to be hidden', async function (this: CustomWorld, selector: string) {
  await this.page!.waitForSelector(selector, { state: 'hidden' });
});

// Network actions
When('there is a network connection issue', async function (this: CustomWorld) {
  await this.page!.context().setOffline(true);
});

When('network connection is restored', async function (this: CustomWorld) {
  await this.page!.context().setOffline(false);
});
