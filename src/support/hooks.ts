import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { CustomWorld } from './world';
import getLogger from '../utils/logger';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const logger = getLogger();

BeforeAll(async function () {
  logger.info('Setting up test environment...');
});

AfterAll(async function () {
  logger.info('Cleaning up test environment...');
});

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  // Obtener el nombre del escenario desde el parámetro del hook
  const scenarioName = scenario.pickle.name || 'Unknown Scenario';
  this.scenarioName = scenarioName;

  await this.initBrowser();
  logger.info(`Starting scenario: ${this.scenarioName}`);
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (this.page) {
    // Take screenshot on failure
    if (scenario.result?.status === Status.FAILED) {
      const scenarioName = this.scenarioName || 'unknown';
      const screenshotPath = `reports/screenshots/${scenarioName.replace(/\s+/g, '_')}.png`;
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      logger.info(`Screenshot saved: ${screenshotPath}`);
    }
  }

  await this.closeBrowser();
  const scenarioName = this.scenarioName || 'Unknown';
  const status = scenario.result?.status || 'UNKNOWN';
  logger.info(`Scenario completed: ${scenarioName} - ${status}`);
});
