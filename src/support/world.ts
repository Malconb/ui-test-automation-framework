import { setWorldConstructor, World, IWorldOptions, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  baseUrl: string;
  pickle?: any;
  initBrowser(): Promise<void>;
  closeBrowser(): Promise<void>;
}

class CustomWorldImpl extends World implements CustomWorld {
  baseUrl: string;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  pickle?: any;

  constructor(options: IWorldOptions) {
    super(options);
    this.baseUrl = this.parameters.baseUrl || 'https://example.com';
  }

  async initBrowser(): Promise<void> {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorldImpl);
