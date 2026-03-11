import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global teardown...');
  
  // Any global cleanup logic here
  // For example: stopping services, cleaning up test data, etc.
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown;
