import { Page } from 'playwright';
import { CommonActions } from './common-actions';

export abstract class BasePage {
  protected page: Page;
  protected baseUrl: string;
  protected actions: CommonActions;

  constructor(page: Page, baseUrl: string = 'https://example.com') {
    this.page = page;
    this.baseUrl = baseUrl;
    this.actions = new CommonActions(page);
  }

  async navigate(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    await this.page.goto(url);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(fileName: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `reports/screenshots/${fileName}`, fullPage: true });
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
}
