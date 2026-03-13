import { Page } from 'playwright';
import { BasePage } from '../base.page';

export class LoginPage extends BasePage {
  public readonly usernameInput = '#user-name';
  public readonly passwordInput = '#password';
  public readonly loginButton = '#login-button';
  public readonly errorMessage = '[data-test="error"]';
  public readonly welcomeMessage = '.app_logo';

  fieldMapping = {
    'Username field': this.usernameInput,
    'Password field': this.passwordInput,
    'Login button': this.loginButton,
    'Error message': this.errorMessage,
    'Welcome message': this.welcomeMessage,
    'Inventory list': '.inventory_list',
    'Product title': '.title',
    'Authentication error': '[data-test="error"]'
  };

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.actions.fillInput(this.usernameInput, username);
    await this.actions.fillInput(this.passwordInput, password);
    await this.actions.clickElement(this.loginButton);
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string> {
    return await this.actions.getText(this.errorMessage);
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.actions.getText(this.welcomeMessage);
  }

  async isOnInventoryPage(): Promise<boolean> {
    return await this.actions.isVisible('.inventory_list');
  }

  async getProductTitle(): Promise<string> {
    return await this.actions.getText('.title');
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.actions.isElementEnabled(this.loginButton);
  }

  async waitForLoginSuccess(): Promise<void> {
    await this.actions.waitForElementToBeVisible(this.welcomeMessage);
  }

  async waitForLoginError(): Promise<void> {
    await this.actions.waitForElementToBeVisible(this.errorMessage);
  }

  // Wrapper methods for backward compatibility with step definitions
  async fillInput(selector: string, value: string): Promise<void> {
    await this.actions.fillInput(selector, value);
  }

  async clickElement(selector: string): Promise<void> {
    await this.actions.clickElement(selector);
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.actions.isVisible(selector);
  }
}
