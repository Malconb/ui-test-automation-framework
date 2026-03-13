import { BasePage } from '../base.page';
import { Page } from 'playwright';
import getLogger from '../../utils/logger';

export class InventoryPage extends BasePage {
  // Inventory page selectors
  public readonly inventoryList = '.inventory_list';
  public readonly productTitle = '.title';
  public readonly productItems = '.inventory_item';
  public readonly productNames = '.inventory_item_name';
  public readonly productPrices = '.inventory_item_price';
  public readonly addToCartButtons = '.btn_inventory';
  public readonly cartBadge = '.shopping_cart_badge';
  public readonly sortDropdown = '.product_sort_container';
  public readonly menuButton = '#react-burger-menu-btn';
  public readonly logoutButton = '#logout-sidebar-link';

  // Product-specific selectors for natural language steps
  private readonly productSelectors = {
    'Sauce Labs Backpack': '.inventory_item:has-text("Sauce Labs Backpack") .btn_inventory',
    'Sauce Labs Bike Light': '.inventory_item:has-text("Sauce Labs Bike Light") .btn_inventory',
    'Sauce Labs Bolt T-Shirt': '.inventory_item:has-text("Sauce Labs Bolt T-Shirt") .btn_inventory',
    'Sauce Labs Fleece Jacket': '.inventory_item:has-text("Sauce Labs Fleece Jacket") .btn_inventory',
    'Sauce Labs Onesie': '.inventory_item:has-text("Sauce Labs Onesie") .btn_inventory',
    'Test.allTheThings() T-Shirt (Red)': '.inventory_item:has-text("Test.allTheThings() T-Shirt (Red)") .btn_inventory'
  };

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async isInventoryPageLoaded(): Promise<boolean> {
    const logger = getLogger();
    logger.info('Checking if inventory page is loaded');
    const isLoaded = await this.actions.isVisible(this.inventoryList);
    logger.info(`Inventory page load status: ${isLoaded}`);
    return isLoaded;
  }

  async getProductCount(): Promise<number> {
    const logger = getLogger();
    logger.info('Getting product count');
    const items = await this.page.$$(this.productItems);
    logger.info(`Found ${items.length} products`);
    return items.length;
  }

  async getProductNames(): Promise<string[]> {
    const logger = getLogger();
    logger.info('Getting product names');
    const names = await this.page.$$eval(this.productNames, elements => 
      elements.map(el => el.textContent || '')
    );
    logger.info(`Retrieved product names: ${names.join(', ')}`);
    return names;
  }

  async getProductPrices(): Promise<string[]> {
    const logger = getLogger();
    logger.info('Getting product prices');
    const prices = await this.page.$$eval(this.productPrices, elements => 
      elements.map(el => el.textContent || '')
    );
    logger.info(`Retrieved product prices: ${prices.join(', ')}`);
    return prices;
  }

  async addProductToCart(productName: string): Promise<void> {
    const logger = getLogger();
    logger.info(`Adding product to cart: ${productName}`);
    const selector = this.productSelectors[productName as keyof typeof this.productSelectors];
    if (selector) {
      logger.info(`Using predefined selector for ${productName}: ${selector}`);
      await this.actions.clickElement(selector);
    } else {
      // Fallback for dynamic product selection
      const dynamicSelector = `${this.productItems}:has-text("${productName}") ${this.addToCartButtons}`;
      logger.info(`Using dynamic selector for ${productName}: ${dynamicSelector}`);
      await this.actions.clickElement(dynamicSelector);
    }
    logger.info(`Successfully added product to cart: ${productName}`);
  }

  async addSauceLabsBackpackToCart(): Promise<void> {
    const logger = getLogger();
    logger.info('Adding Sauce Labs Backpack to cart');
    await this.addProductToCart('Sauce Labs Backpack');
  }

  async addSauceLabsBikeLightToCart(): Promise<void> {
    const logger = getLogger();
    logger.info('Adding Sauce Labs Bike Light to cart');
    await this.addProductToCart('Sauce Labs Bike Light');
  }

  async addSauceLabsBoltTShirtToCart(): Promise<void> {
    const logger = getLogger();
    logger.info('Adding Sauce Labs Bolt T-Shirt to cart');
    await this.addProductToCart('Sauce Labs Bolt T-Shirt');
  }

  async addFirstProductToCart(): Promise<void> {
    const logger = getLogger();
    logger.info('Adding first product to cart');
    await this.actions.clickElement(this.addToCartButtons);
    logger.info('Successfully added first product to cart');
  }

  async getCartBadgeCount(): Promise<number> {
    const logger = getLogger();
    logger.info('Getting cart badge count');
    const badgeText = await this.actions.getText(this.cartBadge);
    const count = badgeText ? parseInt(badgeText) : 0;
    logger.info(`Cart badge count: ${count}`);
    return count;
  }

  async sortProducts(sortOption: string): Promise<void> {
    const logger = getLogger();
    logger.info(`Sorting products by: ${sortOption}`);
    await this.actions.clickElement(this.sortDropdown);
    await this.page.selectOption(this.sortDropdown, { label: sortOption });
    logger.info(`Successfully sorted products by: ${sortOption}`);
  }

  async sortByNameAscending(): Promise<void> {
    const logger = getLogger();
    logger.info('Sorting products by name (A to Z)');
    await this.sortProducts('Name (A to Z)');
  }

  async sortByPriceAscending(): Promise<void> {
    const logger = getLogger();
    logger.info('Sorting products by price (low to high)');
    await this.sortProducts('Price (low to high)');
  }

  async openMenu(): Promise<void> {
    const logger = getLogger();
    logger.info('Opening menu');
    await this.actions.clickElement(this.menuButton);
    logger.info('Menu opened successfully');
  }

  async logout(): Promise<void> {
    const logger = getLogger();
    logger.info('Logging out');
    await this.openMenu();
    await this.actions.clickElement(this.logoutButton);
    logger.info('Logout completed successfully');
  }
}
