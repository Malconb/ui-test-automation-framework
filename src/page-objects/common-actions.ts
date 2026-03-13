import { Page } from 'playwright';
import getLogger from '../utils/logger';

const logger = getLogger();

export class CommonActions {
  constructor(private page: Page) {}

  async clickElement(selector: string): Promise<void> {
    logger.info(`Clicking element: ${selector}`);
    try {
      await this.waitForElement(selector);
      await this.page.click(selector);
      logger.info(`Successfully clicked element: ${selector}`);
    } catch (error) {
      logger.error(`Failed to click element: ${selector} - ${error}`);
      throw error;
    }
  }

  async fillInput(selector: string, value: string): Promise<void> {
    logger.info(`Filling input: ${selector} with value: ${value}`);
    try {
      await this.waitForElement(selector);
      await this.page.fill(selector, value);
      logger.info(`Successfully filled input: ${selector}`);
    } catch (error) {
      logger.error(`Failed to fill input: ${selector} - ${error}`);
      throw error;
    }
  }

  async getText(selector: string): Promise<string> {
    logger.info(`Getting text from element: ${selector}`);
    try {
      await this.waitForElement(selector);
      const text = (await this.page.textContent(selector)) || '';
      logger.info(`Retrieved text from ${selector}: "${text}"`);
      return text;
    } catch (error) {
      logger.error(`Failed to get text from element: ${selector} - ${error}`);
      throw error;
    }
  }

  async isVisible(selector: string): Promise<boolean> {
    logger.info(`Checking visibility of element: ${selector}`);
    const visible = await this.page.isVisible(selector);
    logger.info(`Element ${selector} is ${visible ? 'visible' : 'not visible'}`);
    return visible;
  }

  async waitForElementToBeVisible(selector: string, timeout: number = 10000): Promise<void> {
    logger.info(`Waiting for element to be visible: ${selector} (timeout: ${timeout}ms)`);
    try {
      await this.page.waitForSelector(selector, { state: 'visible', timeout });
      logger.info(`Element became visible: ${selector}`);
    } catch (error) {
      logger.error(`Element did not become visible within timeout: ${selector}`);
      throw error;
    }
  }

  async waitForElementToBeHidden(selector: string, timeout: number = 10000): Promise<void> {
    logger.info(`Waiting for element to be hidden: ${selector} (timeout: ${timeout}ms)`);
    try {
      await this.page.waitForSelector(selector, { state: 'hidden', timeout });
      logger.info(`Element became hidden: ${selector}`);
    } catch (error) {
      logger.error(`Element did not become hidden within timeout: ${selector}`);
      throw error;
    }
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    logger.info(`Checking if element is enabled: ${selector}`);
    try {
      await this.waitForElement(selector);
      const enabled = await this.page.isEnabled(selector);
      logger.info(`Element ${selector} is ${enabled ? 'enabled' : 'disabled'}`);
      return enabled;
    } catch (error) {
      logger.error(`Failed to check if element is enabled: ${selector} - ${error}`);
      throw error;
    }
  }

  async waitForElementContent(
    selector: string,
    expectedContent?: string,
    timeout: number = 10000
  ): Promise<void> {
    logger.info(`Waiting for element content: ${selector} (expected: "${expectedContent || 'any'}")`);
    try {
      await this.waitForElement(selector, timeout);
      if (expectedContent) {
        await this.page.waitForFunction(
          `(() => {
            const element = document.querySelector('${selector}');
            return element && element.textContent && element.textContent.includes('${expectedContent}');
          })()`,
          { timeout }
        );
        logger.info(`Element content matched expected value: ${selector}`);
      } else {
        logger.info(`Element found with any content: ${selector}`);
      }
    } catch (error) {
      logger.error(`Failed to wait for element content: ${selector} - ${error}`);
      throw error;
    }
  }

  private async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
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
