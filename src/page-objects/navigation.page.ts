import { BasePage } from './base.page';
import { Page } from 'playwright';

export class NavigationPage extends BasePage {
  // Navigation-specific selectors
  public readonly menuButton = '#react-burger-menu-btn';
  public readonly logoutButton = '#logout-sidebar-link';
  public readonly resetButton = '#reset-sidebar-link';
  public readonly closeButton = '#react-burger-cross-btn';

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async openMenu(): Promise<void> {
    await this.actions.clickElement(this.menuButton);
  }

  async closeMenu(): Promise<void> {
    await this.actions.clickElement(this.closeButton);
  }

  async logout(): Promise<void> {
    await this.actions.clickElement(this.logoutButton);
  }

  async resetAppState(): Promise<void> {
    await this.actions.clickElement(this.resetButton);
  }
}
