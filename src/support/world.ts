import {
  setWorldConstructor,
  World,
  IWorldOptions,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import getLogger from '../utils/logger';

setDefaultTimeout(60 * 1000);
const logger = getLogger();

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  baseUrl: string;
  pickle?: any;
  scenarioName?: string;
  initBrowser(): Promise<void>;
  closeBrowser(): Promise<void>;
}

class CustomWorldImpl extends World implements CustomWorld {
  baseUrl: string;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  pickle?: any;
  scenarioName?: string;

  constructor(options: IWorldOptions) {
    super(options);
    this.baseUrl = this.parameters.baseUrl || '';
  }

  async initBrowser(): Promise<void> {
    logger.info('Initializing browser...');
    const headless = process.env.HEADLESS === 'false' ? false : true;
    const slowMo = process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0;
    this.browser = await chromium.launch({ headless, slowMo });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser(): Promise<void> {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    logger.info('Browser closed');
  }
}

setWorldConstructor(CustomWorldImpl);
