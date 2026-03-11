import { Page } from 'playwright';

export class WaitHelpers {
  constructor(private page: Page) {}

  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async waitForElementToBeVisible(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async waitForElementToBeHidden(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  async waitForElementToBeEnabled(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector + ':not([disabled])', { timeout });
  }

  async waitForTextToContain(selector: string, text: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForFunction(
      ({ selector: sel, expectedText }: { selector: string; expectedText: string }) => {
        const element = document.querySelector(sel);
        return element && element.textContent?.includes(expectedText);
      },
      { selector, expectedText: text },
      { timeout }
    );
  }

  async waitForUrlToContain(url: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(`**${url}**`, { timeout });
  }

  async waitForNetworkIdle(timeout: number = 10000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  async waitForElementCount(selector: string, expectedCount: number, timeout: number = 10000): Promise<void> {
    await this.page.waitForFunction(
      ({ selector: sel, count }: { selector: string; count: number }) => {
        const elements = document.querySelectorAll(sel);
        return elements.length === count;
      },
      { selector, count: expectedCount },
      { timeout }
    );
  }
}
