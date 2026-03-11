module.exports = {
  default: {
    require: ['src/support/hooks.ts', 'src/support/world.ts', 'src/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:reports/html/cucumber-report.html',
      'json:reports/cucumber-results.json',
      '@cucumber/pretty-formatter'
    ],
    paths: ['features/**/*.feature'],
    parallel: 1,
    publishQuiet: true,
    dryRun: false,
    forceExit: false,
    retry: 2,
    retryTagFilter: '@retry',
    worldParameters: {
      baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com'
    }
  }
}