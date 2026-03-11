import { getTestEnvironment } from '../utils/test-data';

export const TestConfig = {
  ...getTestEnvironment(),

  // Test timeouts
  defaultTimeout: 15000,

  // Retry configuration
  maxRetries: 2,
  retryDelay: 1000,

  // Screenshot configuration
  screenshotOnFailure: true,
  screenshotOnlyOnFailure: true,
  fullPageScreenshots: true,

  // Video configuration
  videoOnFailure: true,
  videoRetentionOnFailure: true,

  // Trace configuration
  traceOnFailure: true,
  traceOnFirstRetry: true,

  // Browser configuration
  defaultBrowser: 'chromium',
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOW_MO || '0'),

  // Viewport configuration
  desktopViewport: { width: 1280, height: 720 },
  mobileViewport: { width: 375, height: 667 },
  tabletViewport: { width: 768, height: 1024 },

  // Report configuration
  reportsDir: './reports',
  screenshotsDir: './reports/screenshots',
  videosDir: './reports/videos',
  htmlReportsDir: './reports/html',

  // Test data configuration
  testDataDir: './test-data',

  // CI/CD configuration
  isCI: process.env.CI === 'true',
  parallelWorkers: process.env.CI ? 1 : undefined,

  // Feature flags
  enableVideoRecording: process.env.ENABLE_VIDEO === 'true',
  enableTracing: process.env.ENABLE_TRACING === 'true',
  enableScreenshots: process.env.ENABLE_SCREENSHOTS !== 'false',
};
