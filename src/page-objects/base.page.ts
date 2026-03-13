import { Page } from 'playwright';
import { CommonActions } from './common-actions';
import getLogger from '../utils/logger';

const logger = getLogger();

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
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
    logger.info(`Navigation completed to: ${url}`);
  }

  async waitForPageLoad(): Promise<void> {
    logger.info('Waiting for page load to complete...');
    await this.page.waitForLoadState('networkidle');
    logger.info('Page load completed');
  }

  async takeScreenshot(fileName: string): Promise<Buffer> {
    logger.info(`Taking screenshot: ${fileName}`);
    const screenshot = await this.page.screenshot({
      path: `reports/screenshots/${fileName}`,
      fullPage: true,
    });
    logger.info(`Screenshot saved: reports/screenshots/${fileName}`);
    return screenshot;
  }

  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    logger.info(`Waiting for element: ${selector} (timeout: ${timeout}ms)`);
    try {
      await this.page.waitForSelector(selector, { timeout });
      logger.info(`Element found: ${selector}`);
    } catch (error) {
      logger.error(`Element not found within timeout: ${selector}`);
      throw error;
    }
  }
}
