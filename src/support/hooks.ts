import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';

BeforeAll(async function () {
  console.log('🚀 Setting up test environment...');
});

AfterAll(async function () {
  console.log('🧹 Cleaning up test environment...');
});

Before(async function (this: CustomWorld) {
  this.pickle = this.pickle || { name: 'Unknown Scenario' };
  await this.initBrowser();
  console.log(`🌐 Starting scenario: ${this.pickle.name}`);
});

After(async function (this: CustomWorld, result: any) {
  if (this.page) {
    // Take screenshot on failure
    if (result.status === Status.FAILED) {
      const screenshotPath = `reports/screenshots/${this.pickle?.name?.replace(/\s+/g, '_') || 'unknown'}.png`;
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);
    }
  }

  await this.closeBrowser();
  console.log(`✅ Scenario completed: ${this.pickle?.name || 'Unknown'} - ${result.status}`);
});
