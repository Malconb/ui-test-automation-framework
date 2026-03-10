module.exports = {
  default: {
    require: ['src/support/*.ts', 'src/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    paths: ['src/features/**/*.feature'],
    parallel: 2
  }
}