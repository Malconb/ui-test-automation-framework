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
    const logger = getLogger();
    logger.info('Initializing browser...');
    const headless = process.env.HEADLESS === 'false' ? false : true;
    const slowMo = process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0;
    logger.info(`Browser configuration - Headless: ${headless}, SlowMo: ${slowMo}ms`);
    
    try {
      this.browser = await chromium.launch({ headless, slowMo });
      logger.info('Browser launched successfully');
      
      this.context = await this.browser.newContext();
      logger.info('Browser context created');
      
      this.page = await this.context.newPage();
      logger.info('Browser page created');
    } catch (error) {
      logger.error(`Failed to initialize browser: ${error}`);
      throw error;
    }
  }

  async closeBrowser(): Promise<void> {
    const logger = getLogger();
    logger.info('Closing browser...');
    
    try {
      if (this.page) {
        await this.page.close();
        logger.info('Browser page closed');
      }
      if (this.context) {
        await this.context.close();
        logger.info('Browser context closed');
      }
      if (this.browser) {
        await this.browser.close();
        logger.info('Browser closed');
      }
    } catch (error) {
      logger.error(`Error closing browser: ${error}`);
      throw error;
    }
  }
}

setWorldConstructor(CustomWorldImpl);
