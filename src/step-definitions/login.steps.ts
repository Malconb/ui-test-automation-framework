import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../page-objects/login-page/login.page';
import { TestData } from '../utils/test-data';
import './common-actions.steps'; // Import common actions

Given('I am on the SauceDemo login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateToLogin();
});

When('I leave username and password fields empty', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.login('', '');
});

When('I enter credentials for a locked account', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const lockedUser = TestData.lockedUser;
  await loginPage.login(lockedUser.username, lockedUser.password);
});

When('I enter valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const validUser = TestData.validUser;
  await loginPage.login(validUser.username, validUser.password);
});

When('there is a network connection issue', async function (this: CustomWorld) {
  await this.page!.context().setOffline(true);
});

Then('I should see an account locked error message', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.waitForLoginError();
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).to.include('locked out');
});

Then('I should see a network error message', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.waitForLoginError();
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).to.include('network');
});

Then('I should see an authentication error message', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.waitForLoginError();
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).to.include('Epic sadface');
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('saucedemo.com');
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const isOnInventoryPage = await loginPage.isOnInventoryPage();
  expect(isOnInventoryPage).to.be.false;
});
