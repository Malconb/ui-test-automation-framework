import { Page } from 'playwright';

export class CommonActions {
  constructor(private page: Page) {}

  async clickElement(selector: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.fill(selector, value);
  }

  async getText(selector: string): Promise<string> {
    await this.waitForElement(selector);
    return (await this.page.textContent(selector)) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async waitForElementToBeVisible(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async waitForElementToBeHidden(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    await this.waitForElement(selector);
    return await this.page.isEnabled(selector);
  }

  async waitForElementContent(
    selector: string,
    expectedContent?: string,
    timeout: number = 10000
  ): Promise<void> {
    await this.waitForElement(selector, timeout);
    if (expectedContent) {
      await this.page.waitForFunction(
        `(() => {
          const element = document.querySelector('${selector}');
          return element && element.textContent && element.textContent.includes('${expectedContent}');
        })()`,
        { timeout }
      );
    }
  }

  private async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
}
