import { expect } from 'chai';
import { Page } from 'playwright';

export class AssertionHelpers {
  constructor(private page: Page) {}

  async assertElementExists(selector: string): Promise<void> {
    const element = await this.page.$(selector);
    expect(element, `Element with selector "${selector}" should exist`).to.not.be.null;
  }

  async assertElementVisible(selector: string): Promise<void> {
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible, `Element with selector "${selector}" should be visible`).to.be.true;
  }

  async assertElementHidden(selector: string): Promise<void> {
    const isVisible = await this.page.isVisible(selector);
    expect(isVisible, `Element with selector "${selector}" should be hidden`).to.be.false;
  }

  async assertTextEquals(selector: string, expectedText: string): Promise<void> {
    const actualText = await this.page.textContent(selector);
    expect(actualText?.trim(), `Text should equal "${expectedText}"`).to.equal(expectedText);
  }

  async assertTextContains(selector: string, expectedText: string): Promise<void> {
    const actualText = await this.page.textContent(selector);
    expect(actualText, `Text should contain "${expectedText}"`).to.include(expectedText);
  }

  async assertElementEnabled(selector: string): Promise<void> {
    const isEnabled = await this.page.isEnabled(selector);
    expect(isEnabled, `Element with selector "${selector}" should be enabled`).to.be.true;
  }

  async assertElementDisabled(selector: string): Promise<void> {
    const isEnabled = await this.page.isEnabled(selector);
    expect(isEnabled, `Element with selector "${selector}" should be disabled`).to.be.false;
  }

  async assertElementCount(selector: string, expectedCount: number): Promise<void> {
    const actualCount = await this.page.locator(selector).count();
    expect(actualCount, `Element count should be ${expectedCount}`).to.equal(expectedCount);
  }

  async assertUrlContains(expectedUrl: string): Promise<void> {
    const currentUrl = this.page.url();
    expect(currentUrl, `URL should contain "${expectedUrl}"`).to.include(expectedUrl);
  }

  async assertTitleEquals(expectedTitle: string): Promise<void> {
    const actualTitle = await this.page.title();
    expect(actualTitle, `Page title should be "${expectedTitle}"`).to.equal(expectedTitle);
  }

  async assertAttributeValue(
    selector: string,
    attribute: string,
    expectedValue: string
  ): Promise<void> {
    const actualValue = await this.page.getAttribute(selector, attribute);
    expect(actualValue, `Attribute "${attribute}" should be "${expectedValue}"`).to.equal(
      expectedValue
    );
  }
}
