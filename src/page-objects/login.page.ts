import { Page } from 'playwright';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '.error-message';
  private readonly welcomeMessage = '.welcome-message';

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigate('/login');
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

  async isLoginButtonEnabled(): Promise<boolean> {
    await this.waitForElement(this.loginButton);
    return await this.page.isEnabled(this.loginButton);
  }

  async waitForLoginSuccess(): Promise<void> {
    await this.waitForElementToBeVisible(this.welcomeMessage);
  }

  async waitForLoginError(): Promise<void> {
    await this.waitForElementToBeVisible(this.errorMessage);
  }
}
