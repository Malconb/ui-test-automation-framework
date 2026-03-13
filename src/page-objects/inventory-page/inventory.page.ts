import { BasePage } from '../base.page';
import { Page } from 'playwright';

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
    return await this.actions.isVisible(this.inventoryList);
  }

  async getProductCount(): Promise<number> {
    const items = await this.page.$$(this.productItems);
    return items.length;
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.$$eval(this.productNames, elements => 
      elements.map(el => el.textContent || '')
    );
  }

  async getProductPrices(): Promise<string[]> {
    return await this.page.$$eval(this.productPrices, elements => 
      elements.map(el => el.textContent || '')
    );
  }

  async addProductToCart(productName: string): Promise<void> {
    const selector = this.productSelectors[productName as keyof typeof this.productSelectors];
    if (selector) {
      await this.actions.clickElement(selector);
    } else {
      // Fallback for dynamic product selection
      const dynamicSelector = `${this.productItems}:has-text("${productName}") ${this.addToCartButtons}`;
      await this.actions.clickElement(dynamicSelector);
    }
  }

  async addSauceLabsBackpackToCart(): Promise<void> {
    await this.addProductToCart('Sauce Labs Backpack');
  }

  async addSauceLabsBikeLightToCart(): Promise<void> {
    await this.addProductToCart('Sauce Labs Bike Light');
  }

  async addSauceLabsBoltTShirtToCart(): Promise<void> {
    await this.addProductToCart('Sauce Labs Bolt T-Shirt');
  }

  async addFirstProductToCart(): Promise<void> {
    await this.actions.clickElement(this.addToCartButtons);
  }

  async getCartBadgeCount(): Promise<number> {
    const badgeText = await this.actions.getText(this.cartBadge);
    return badgeText ? parseInt(badgeText) : 0;
  }

  async sortProducts(sortOption: string): Promise<void> {
    await this.actions.clickElement(this.sortDropdown);
    await this.page.selectOption(this.sortDropdown, { label: sortOption });
  }

  async sortByNameAscending(): Promise<void> {
    await this.sortProducts('Name (A to Z)');
  }

  async sortByPriceAscending(): Promise<void> {
    await this.sortProducts('Price (low to high)');
  }

  async openMenu(): Promise<void> {
    await this.actions.clickElement(this.menuButton);
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.actions.clickElement(this.logoutButton);
  }
}
