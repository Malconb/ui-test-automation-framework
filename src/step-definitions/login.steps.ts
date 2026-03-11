import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../page-objects/login.page';
import { TestData } from '../utils/test-data';

Given('I am on the SauceDemo login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.navigateToLogin();
});

When('I enter {string} as username', async function (this: CustomWorld, username: string) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.fillInput(loginPage.usernameInput, username);
});

When('I enter {string} as password', async function (this: CustomWorld, password: string) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.fillInput(loginPage.passwordInput, password);
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
  await loginPage.fillInput('#username', validUser.username);
  await loginPage.fillInput('#password', validUser.password);
});

When('there is a network connection issue', async function (this: CustomWorld) {
  // Simulate network issue by going offline
  await this.page!.context().setOffline(true);
});

When('I click the login button', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.clickElement(loginPage.loginButton);
});

Then('I should be redirected to the inventory page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.waitForLoginSuccess();
  const isOnInventoryPage = await loginPage.isOnInventoryPage();
  expect(isOnInventoryPage).to.be.true;
});

Then('I should see the products title', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const productTitle = await loginPage.getProductTitle();
  expect(productTitle).to.include('Products');
});

Then('I should see an error message', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  await loginPage.waitForLoginError();
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).to.not.be.empty;
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  const currentUrl = this.page!.url();
  expect(currentUrl).to.include('saucedemo.com');
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const isOnInventoryPage = await loginPage.isOnInventoryPage();
  expect(isOnInventoryPage).to.be.false;
});

Then('I should see validation errors', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const usernameError = await loginPage.isVisible('#username-error');
  const passwordError = await loginPage.isVisible('#password-error');
  expect(usernameError || passwordError).to.be.true;
});

Then('the login button should be disabled', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!, this.baseUrl);
  const isButtonEnabled = await loginPage.isLoginButtonEnabled();
  expect(isButtonEnabled).to.be.false;
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
