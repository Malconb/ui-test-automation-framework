import { BasePage } from './base.page';
import { Page } from 'playwright';

export class NavigationPage extends BasePage {
  // Navigation-specific selectors
  public readonly menuButton = '#react-burger-menu-btn';
  public readonly logoutButton = '#logout-sidebar-link';
  public readonly resetButton = '#reset-sidebar-link';
  public readonly closeButton = '#react-burger-cross-btn';
  public readonly sidebarMenu = '.bm-menu-wrap';

  fieldMapping = {
    'Menu button': this.menuButton,
    'Logout button': this.logoutButton,
    'Reset button': this.resetButton,
    'Close button': this.closeButton,
    'Sidebar menu': this.sidebarMenu
  };

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async openMenu(): Promise<void> {
    await this.actions.clickElement(this.menuButton);
    await this.actions.waitForElementToBeVisible(this.sidebarMenu);
  }

  async closeMenu(): Promise<void> {
    await this.actions.clickElement(this.closeButton);
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.click(this.logoutButton);
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.actions.clickElement(this.resetButton);
  }
}
