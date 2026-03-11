import { Page } from 'playwright';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  public readonly usernameInput = '#user-name';
  public readonly passwordInput = '#password';
  public readonly loginButton = '#login-button';
  public readonly errorMessage = '[data-test="error"]';
  public readonly welcomeMessage = '.app_logo';

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForPageLoad();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }

  async isOnInventoryPage(): Promise<boolean> {
    return await this.isVisible('.inventory_list');
  }

  async getProductTitle(): Promise<string> {
    return await this.getText('.title');
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.isElementEnabled(this.loginButton);
  }

  async waitForLoginSuccess(): Promise<void> {
    await this.waitForElementToBeVisible(this.welcomeMessage);
  }

  async waitForLoginError(): Promise<void> {
    await this.waitForElementToBeVisible(this.errorMessage);
  }
}
